import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "אנא הכנס מינימום 6 ספרות",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "אימייל לא תקין",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "אימייל לא תקין",
  }),
  password: z.string().min(6, {
    message: " אנא הכנס סיסמא מעל 6 ספרות",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "נדרש אימייל",
  }),
  password: z.string().min(6, {
    message: "אנא הכנס מינימום 6 ספרות",
  }),
  name: z.string().min(1, {
    message: "אנא הכנס שם תקין",
  }),
});

export const QuestionnaireSchema = z.object({
  title: z.string().min(1, {
    message: "אנא הכנס כותרת תקינה",
  }),
  content: z.string().min(1, {
    message: "אנא כתוב תוכן על מנת להמשיך",
  }),
});
export const AnswerQuestionnaireSchema = z.object({
  answer: z.string().min(1, {
    message: "אין להשאיר תשובה ריקה",
  }),
});
