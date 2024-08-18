import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
  studentStats,
  getAllStudentsByTeacher,
  getAllTeachersNameAndID,
  NumberOfTeachersWaitingApproval,
  ApproveTeacher,
  NumberOfTaskToDo,
  DeleteUser,
  getTeachersWaitingApproval,
} from "../lib/ServerActions/ServerActions";

// Mock the necessary modules and functions
jest.mock("@/auth", () => ({
  __esModule: true,
  auth: jest.fn(),
}));

jest.mock("@/lib/db", () => ({
  __esModule: true,
  db: {
    studentAnswer: {
      findMany: jest.fn(),
    },
    teacher: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    student: {
      findUnique: jest.fn(),
    },
    teacherTask: { // Ensure this is added
      updateMany: jest.fn(),
    },
  },
}));

describe("ServerActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  describe("getAllTeachersNameAndID", () => {
    it("should return all teachers", async () => {
      const mockTeachers = [
        { id: "teacher1", name: "Teacher 1" },
        { id: "teacher2", name: "Teacher 2" },
      ];

      (db.teacher.findMany as jest.Mock).mockResolvedValue(mockTeachers);

      const result = await getAllTeachersNameAndID();

      expect(result).toEqual(mockTeachers);
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Database error");

      (db.teacher.findMany as jest.Mock).mockRejectedValue(mockError);

      const result = await getAllTeachersNameAndID();

      expect(console.error).toHaveBeenCalledWith("Error Fetching All Teachers - ", mockError);
      expect(result).toBeUndefined();
    });
  });

  describe("NumberOfTeachersWaitingApproval", () => {
    it("should return the number of teachers waiting for approval", async () => {
      const mockTeachers = [
        { id: "teacher1", role: "TEACHERNOTAPPROVED" },
        { id: "teacher2", role: "TEACHERNOTAPPROVED" },
      ];

      (db.user.findMany as jest.Mock).mockResolvedValue(mockTeachers);

      const result = await NumberOfTeachersWaitingApproval();

      expect(result).toBe(mockTeachers.length);
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Database error");

      (db.user.findMany as jest.Mock).mockRejectedValue(mockError);

      const result = await NumberOfTeachersWaitingApproval();

      expect(console.error).toHaveBeenCalledWith("Error Fetching All Teachers - ", mockError);
      expect(result).toBeUndefined();
    });
  });

  describe("ApproveTeacher", () => {
    it("should update the teacher's role to TEACHER", async () => {
      const mockTeacherId = "teacher123";

      (db.user.update as jest.Mock).mockResolvedValue({});

      await ApproveTeacher(mockTeacherId);

      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: mockTeacherId },
        data: { role: "TEACHER" },
      });
    });

    it("should handle errors gracefully", async () => {
      const mockTeacherId = "teacher123";
      const mockError = new Error("Database error");

      (db.user.update as jest.Mock).mockRejectedValue(mockError);

      const result = await ApproveTeacher(mockTeacherId);

      expect(console.error).toHaveBeenCalledWith("Error Fetching All Teachers - ", mockError);
      expect(result).toBeUndefined();
    });
  });

  describe("NumberOfTaskToDo", () => {
    it("should return the number of tasks to do for the student", async () => {
      const mockUserId = "student123";
      const mockTasks = [
        { id: "task1", grade: null, approvedByAdmin: true },
        { id: "task2", grade: null, approvedByAdmin: true },
      ];
  
      // Mock db.student.findUnique to return tasks
      (db.student.findUnique as jest.Mock).mockResolvedValue({
        tasks: mockTasks,
      });
  
      // Mock db.teacherTask.updateMany to do nothing
      (db.teacherTask.updateMany as jest.Mock).mockResolvedValue({});
  
      const result = await NumberOfTaskToDo(mockUserId);
  
      expect(result).toBe(mockTasks.length);
    });
  
    it("should throw an error if userId is not provided", async () => {
      await expect(NumberOfTaskToDo(undefined)).rejects.toThrow("userId is required");
    });
  
    it("should handle errors gracefully", async () => {
      const mockUserId = "student123";
      const mockError = new Error("Database error");
  
      // Mock db.teacherTask.updateMany to throw an error
      (db.teacherTask.updateMany as jest.Mock).mockRejectedValue(mockError);
  
      // Ensure that db.student.findUnique is still mocked correctly
      (db.student.findUnique as jest.Mock).mockResolvedValue({
        tasks: [],
      });
  
      const result = await NumberOfTaskToDo(mockUserId);
  
      expect(console.error).toHaveBeenCalledWith("Error Fetching All Teachers - ", mockError);
      expect(result).toBeUndefined();
    });
  });
  describe("DeleteUser", () => {
    it("should delete the user by id", async () => {
      const mockUserId = "user123";

      (db.user.delete as jest.Mock).mockResolvedValue({});

      await DeleteUser(mockUserId);

      expect(db.user.delete).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
    });

    it("should handle errors gracefully", async () => {
      const mockUserId = "user123";
      const mockError = new Error("Database error");

      (db.user.delete as jest.Mock).mockRejectedValue(mockError);

      const result = await DeleteUser(mockUserId);

      expect(console.error).toHaveBeenCalledWith("Error Fetching All Teachers - ", mockError);
      expect(result).toBeUndefined();
    });
  });

  describe("getTeachersWaitingApproval", () => {
    it("should return teachers waiting for approval", async () => {
      const mockTeachers = [
        { id: "teacher1", name: "Teacher 1" },
        { id: "teacher2", name: "Teacher 2" },
      ];

      (db.user.findMany as jest.Mock).mockResolvedValue(mockTeachers);

      const result = await getTeachersWaitingApproval();

      expect(result).toEqual(mockTeachers);
    });

    it("should handle errors gracefully", async () => {
      const mockError = new Error("Database error");

      (db.user.findMany as jest.Mock).mockRejectedValue(mockError);

      const result = await getTeachersWaitingApproval();

      expect(console.error).toHaveBeenCalledWith("Error Fetching All Teachers - ", mockError);
      expect(result).toBeUndefined();
    });
  });
});