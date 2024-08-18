import { db } from "../lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getStudentById = async (id: string) => {
  try {
    const user = await db.student.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const checkQuestionnaire = async (userID: string) => {
  try {
    const questionnaire = await db.questionnaire.findFirst({
      include: {
        answers: {
          where: {
            teacher: { userId: userID },
          },
        },
      },
    });

    if (!questionnaire) {
      return { exists: false, answered: false, questionnaire: null };
    }

    const questionnaireAnswer =
      questionnaire.answers.length > 0 ? questionnaire.answers[0] : null;

    return {
      exists: true,
      answered: !!questionnaireAnswer,
      questionnaire,
      answer: questionnaireAnswer?.answer || null,
    };
  } catch (error) {
    console.error("לא הצלחנו לייבא את השאלון", error);
  }
};
