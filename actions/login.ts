"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "../auth";
import { TEACHER_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "שדות לא חוקיים!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "שם משתמש/סיסמא לא נכונים" };
  }

  let UrlRedirect;
  switch (existingUser.role) {
    case "TEACHER":
      UrlRedirect = TEACHER_LOGIN_REDIRECT;
      break;
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: UrlRedirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials!" };
        default:
          return { error: "שם משתמש/סיסמא לא נכונים" };
      }
    }
    throw error;
  }
};
