"use server";
import { TeacherNotApprovedRoute } from "@/routes";
import { db } from "../db";
import { auth } from "@/auth";
import { Select } from "@tremor/react";
import { StudentAnswer } from "@prisma/client";

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
