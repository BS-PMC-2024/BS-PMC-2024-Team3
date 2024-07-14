"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { generateVerficiationToken } from "@/lib/tokens";
import { UserRole } from "@prisma/client";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  roleSelected: string,
  teacherSelected: string | null
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  let RegisterRole;
  if (!validatedFields.success) {
    return { error: "שדות לא חוקיים!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "האיימיל הזה כבר בשימוש!" };
  }
  if (roleSelected === "TEACHER") {
    RegisterRole = "TEACHERNOTAPPROVED";
  } else {
    RegisterRole = "STUDENT";
  }
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: RegisterRole as UserRole,
      },
    });

    if (roleSelected === "STUDENT" && teacherSelected) {
      await db.student.create({
        data: {
          userId: newUser.id,
          teacherId: teacherSelected,
          name: newUser.name,
          image: newUser.image ? newUser.image : null,
        },
      });
    } else if (roleSelected === "TEACHER") {
      await db.teacher.create({
        data: {
          userId: newUser.id,
          name: newUser.name,
          image: newUser.image ? newUser.image : null,
        },
      });
    }
  } catch (error) {
    console.error("Failed to create user and profile:", error);
    throw error;
  }

  return { success: "המשתמש נוצר בהצלחה!" };
};
