"use server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "חסר אסימון" };
  }
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "סיסמא לא תקינה!" };
  }

  const { password } = validateFields.data;

  const exitingToken = await getPasswordResetTokenByToken(token);

  if (!exitingToken) {
    return { error: "חסר אסימון" };
  }

  const hasExpired = new Date(exitingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "פג תוקף החלפת הסיסמא" };
  }

  const existingUser = await getUserByEmail(exitingToken.email);

  if (!existingUser) {
    return { error: "אימייל לא קיים במערכת" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: exitingToken.id },
  });

  return { success: "הסיסמא שונתה בהצלחה! " };
};
