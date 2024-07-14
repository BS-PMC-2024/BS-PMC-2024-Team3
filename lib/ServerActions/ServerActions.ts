"use server";
import { TeacherNotApprovedRoute } from "@/routes";
import { db } from "../db";

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
      where: { role: "STUDENT" && "TEACHER" },
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
