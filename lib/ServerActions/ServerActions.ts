"use server";
import { TeacherNotApprovedRoute } from "@/routes";
import { db } from "../db";
import { auth } from "@/auth";
import { Select } from "@tremor/react";
import { Question, StudentAnswer } from "@prisma/client";

export const getAllTeachersNameAndID = async () => {
  try {
    const Teachers = await db.teacher.findMany({});
    return Teachers;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const NumberOfTeachersWaitingApproval = async () => {
  try {
    const number = await db.user.findMany({
      where: { role: "TEACHERNOTAPPROVED" },
    });
    return number.length;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const getTeachersWaitingApproval = async () => {
  try {
    const Teachers = await db.user.findMany({
      where: { role: "TEACHERNOTAPPROVED" },
      select: { id: true, name: true },
    });
    return Teachers;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const ApproveTeacher = async (id: string) => {
  try {
    await db.user.update({
      where: { id },
      data: { role: "TEACHER" },
    });
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const getAllUsers = async () => {
  try {
    const Users = await db.user.findMany({
      where: {
        role: {
          in: ["STUDENT", "TEACHER"],
        },
      },
    });
    return Users;
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const DeleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error Fetching All Teachers - ", error);
  }
};

export const studentSelfLearningAnswer = async (
  level: string | null,
  type: string,
  text: string,
  correctAnswer: string,
  correct: boolean
) => {
  try {
    const session = await auth();
    if (session) {
      const question = await db.question.create({
        data: {
          ...(level ? { level } : {}),
          type,
          text,
          correctAnswer,
        },
      });
      const studentAnswer = await db.studentAnswer.create({
        data: {
          student: {
            connect: {
              userId: session.user.id,
            },
          },
          question: {
            connect: {
              id: question.id,
            },
          },
          givenAnswer: correctAnswer,
          isCorrect: correct,
        },
      });
    }
  } catch (error) {
    console.error("Error Saving Answer - ", error);
  }
};

export const studentStats = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  try {
    const studentAnswers = await db.studentAnswer.findMany({
      where: {
        student: {
          userId: userId,
        },
      },
      include: {
        question: {
          select: {
            type: true,
            level: true,
          },
        },
      },
    });
    return studentAnswers;
  } catch (error) {
    console.error("Error getting student stats", error);
    throw error;
  }
};

export const UpdateUserDetails = async (
  NewName: string | null,
  NewImage: string | null
) => {
  try {
    const session = await auth();
    if (!session) return;

    const userId = session.user.id;
    const userRole = session.user.role;
    const updateData = {
      name: NewName ?? undefined,
      image: NewImage ?? undefined,
    };
    await db.user.update({
      where: { id: userId },
      data: updateData,
    });
    if (userRole === "STUDENT") {
      const student = await db.student.findUnique({ where: { userId } });
      if (student) {
        await db.student.update({
          where: { id: student.id },
          data: updateData,
        });
      }
    } else if (userRole === "TEACHER") {
      const teacher = await db.teacher.findUnique({ where: { userId } });
      if (teacher) {
        await db.teacher.update({
          where: { id: teacher.id },
          data: updateData,
        });
      }
    }
  } catch (error) {
    console.error("Error Changing User Details in DB ", error);
  }
};

export const getMyTeacher = async () => {
  try {
    const session = await auth();
    if (!session) return;
    const teacher = await db.student.findUnique({
      where: { userId: session.user.id },
      select: {
        teacher: true,
        rating: { select: { id: true, score: true } },
      },
    });
    return {
      id: teacher?.teacher.id || "",
      name: teacher?.teacher.name || null,
      image: teacher?.teacher.image || null,
      score: teacher?.rating?.score || null,
    };
  } catch (error) {
    console.error("Error getting the teacher", error);
  }
};

export const AddReviewToTeacher = async (
  ExistReview: boolean,
  score: number,
  teacherId: string
) => {
  try {
    const session = await auth();
    if (!session) return;
    const student = await db.student.findUnique({
      where: { userId: session.user.id },
    });

    if (!student) {
      console.error("Student record not found for the current user");
      return;
    }
    if (!ExistReview) {
      await db.rating.create({
        data: {
          score,
          student: { connect: { id: student.id } },
          teacher: { connect: { id: teacherId } },
        },
      });
    } else {
      const rating = await db.rating.findFirst({
        where: {
          studentId: student.id,
          teacherId: teacherId,
        },
      });

      if (rating) {
        await db.rating.update({
          where: { id: rating.id },
          data: { score },
        });
      } else {
        console.error("Existing review was not found.");
      }
    }
  } catch (error) {
    console.error("Error Changing User Details in DB ", error);
  }
};

export const getContentRating = async () => {
  try {
    const session = await auth();
    if (!session) return;
    const teacher = await db.teacher.findUnique({
      where: { userId: session.user.id },
    });
    if (!teacher) {
      console.error("Teacher not found for userId:", session.user.id);
      return null;
    }
    const contentRating = await db.contentRating.findFirst({
      where: { teacherId: teacher.id },
    });

    if (!contentRating) {
      console.warn("No rating found for teacherId:", teacher.id);
      return null;
    }

    return contentRating;
  } catch (error) {
    console.error("Error getting content rating ", error);
  }
};

export const AddReviewToContent = async (
  existReview: boolean,
  comment: string,
  rating: number,
  targetId: string | undefined
) => {
  try {
    const session = await auth();
    if (!session) return;

    const teacher = await db.teacher.findUnique({
      where: { userId: session.user.id },
    });

    if (!teacher) {
      console.error("Teacher record not found for the current user");
      return;
    }

    if (!existReview) {
      await db.contentRating.create({
        data: {
          comment,
          rating,
          teacher: { connect: { id: teacher.id } },
        },
      });
    } else {
      await db.contentRating.update({
        where: { id: targetId },
        data: { comment, rating },
      });
    }
  } catch (error) {
    console.error("Error adding or updating content review in DB", error);
  }
};

export const getAllStudentsByTeacher = async () => {
  try {
    const session = await auth();
    if (!session) return { allStudents: [], combinedAnswers: [] };
    const teacherWithStudents = await db.teacher.findUnique({
      where: { userId: session.user.id },
      select: {
        students: {
          include: {
            answers: {
              include: {
                question: {
                  select: {
                    type: true,
                    level: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const allStudents = teacherWithStudents?.students || [];
    const combinedAnswers = allStudents.reduce(
      (acc: StudentAnswer[], student) => {
        acc.push(...student.answers);
        return acc;
      },
      []
    );

    return { allStudents, combinedAnswers };
  } catch (error) {
    console.error("Error adding or updating content review in DB", error);
    return { allStudents: [], combinedAnswers: [] };
  }
};

export const getStudentData = async (id: string) => {
  try {
    const student = await db.student.findUnique({
      where: { id },
      include: {
        answers: { include: { question: true } },
        tasks: { include: { questions: true } },
        user: { select: { email: true } },
      },
    });
    return student;
  } catch (error) {
    console.error("Error Getting Student Data", error);
  }
};

export const createTaskToStudent = async (
  level: string | null,
  selectedQuestionType: string,
  task: Question[],
  studentId: string,
  date: string,
  messageText: string
) => {
  const session = await auth();
  if (!session) {
    return;
  }
  const teacherExists = await db.teacher.findUnique({
    where: { userId: session.user.id },
  });
  if (!teacherExists) {
    throw new Error(`Teacher with ID does not exist.`);
  }
  const dateObject = new Date(date);
  const createdQuestions = [];

  for (const question of task) {
    let createdQuestion;
    switch (selectedQuestionType) {
      case "grammar":
        createdQuestion = await db.question.create({
          data: {
            ...(level ? { level } : {}),
            type: "grammar",
            text: question.text,
            correctAnswer: question.correctAnswer,
          },
        });
        break;

      case "openQuestions":
        createdQuestion = await db.question.create({
          data: {
            ...(level ? { level } : {}),
            type: "openQuestions",
            text: question.text,
            correctAnswer: question.correctAnswer.toString(),
            falseAnswer1: question.falseAnswer1,
            falseAnswer2: question.falseAnswer2,
            falseAnswer3: question.falseAnswer3,
          },
        });
        break;

      case "vocabulary":
        createdQuestion = await db.question.create({
          data: {
            ...(level ? { level } : {}),
            type: "vocabulary",
            text: question.text,
            correctAnswer: question.correctAnswer,
            falseAnswer1: question.falseAnswer1,
            falseAnswer2: question.falseAnswer2,
            falseAnswer3: question.falseAnswer3,
          },
        });
        break;

      default:
        console.error("Unknown question type:", selectedQuestionType);
        continue;
    }
    createdQuestions.push(createdQuestion);
  }
  await db.teacherTask.create({
    data: {
      date: dateObject,
      ...(level ? { level } : {}),
      messageText: messageText,
      student: {
        connect: { id: studentId },
      },
      questions: {
        connect: createdQuestions.map((q) => ({ id: q.id })),
      },
      teacher: {
        connect: { id: teacherExists.id },
      },
    },
  });
};

export const getAllTaskByStudentID = async () => {
  const session = await auth();
  if (!session) {
    return;
  }
  try {
    const tasks = await db.teacherTask.findMany({
      where: { student: { userId: session.user.id } },
      include: {
        questions: {
          include: {
            studentAnswers: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
    return tasks;
  } catch (error) {
    console.error("Error Getting Student Tasks", error);
  }
};

export const saveStudentAnswerFromTask = async (
  questionId: string,
  answer: string,
  correct: boolean
) => {
  const session = await auth();
  if (!session) {
    return;
  }
  try {
    await db.studentAnswer.create({
      data: {
        givenAnswer: answer,
        isCorrect: correct,
        question: { connect: { id: questionId } },
        student: { connect: { userId: session.user.id } },
      },
    });
    if (session.user.id) {
      await updateGrade(questionId, session.user.id);
    }
  } catch (error) {
    console.error("Error Saving Student Answer", error);
  }
};

export const updateGrade = async (questionId: string, userId: string) => {
  try {
    const teacherTask = await db.teacherTask.findFirst({
      where: {
        questions: {
          some: {
            id: questionId,
          },
        },
      },
      include: {
        questions: true,
      },
    });

    if (!teacherTask) {
      console.error("TeacherTask not found for the given questionId");
      return;
    }

    const studentAnswers = await db.studentAnswer.findMany({
      where: {
        student: {
          userId: userId,
        },
        question: {
          tasks: {
            some: {
              id: teacherTask.id,
            },
          },
        },
      },
    });

    const totalQuestions = teacherTask.questions.length;
    const answeredQuestions = studentAnswers.length;

    if (answeredQuestions < totalQuestions) {
      return;
    }

    const correctAnswers = studentAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    const grade = (100 / totalQuestions) * correctAnswers;
    await db.teacherTask.update({
      where: {
        id: teacherTask.id,
      },
      data: {
        grade: grade.toFixed(2),
      },
    });
  } catch (error) {
    console.error("Error updating grade", error);
  }
};
