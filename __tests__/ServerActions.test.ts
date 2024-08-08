import { db } from "@/lib/db";
import { auth } from "@/auth";
import { studentStats, getAllStudentsByTeacher } from "../lib/ServerActions/ServerActions";

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
    },
  },
}));

describe("ServerActions", () => {
  describe("studentStats", () => {
    it("should return student answers if userId is provided", async () => {
      const mockUserId = "user123";
      const mockAnswers = [
        { id: "answer1", studentId: mockUserId, question: { type: "MCQ" } },
        { id: "answer2", studentId: mockUserId, question: { type: "Fill in the blank" } },
      ];

      (db.studentAnswer.findMany as jest.Mock).mockResolvedValue(mockAnswers);

      const result = await studentStats(mockUserId);

      expect(result).toEqual(mockAnswers);
    });

    it("should throw an error if userId is not provided", async () => {
      await expect(studentStats(undefined)).rejects.toThrow("userId is required");
    });

    it("should handle errors gracefully", async () => {
      const mockUserId = "user123";
      const mockError = new Error("Database error");

      (db.studentAnswer.findMany as jest.Mock).mockRejectedValue(mockError);

      await expect(studentStats(mockUserId)).rejects.toThrow(mockError);
    });
  });

  describe("getAllStudentsByTeacher", () => {
    it("should return all students and their combined answers for a teacher", async () => {
      const mockSession = { user: { id: "teacher123" } };
      const mockTeacherWithStudents = {
        students: [
          {
            id: "student1",
            answers: [
              { id: "answer1", question: { type: "MCQ" } },
              { id: "answer2", question: { type: "Fill in the blank" } },
            ],
          },
          {
            id: "student2",
            answers: [
              { id: "answer3", question: { type: "MCQ" } },
              { id: "answer4", question: { type: "Short answer" } },
            ],
          },
        ],
      };

      (auth as jest.Mock).mockResolvedValue(mockSession);
      (db.teacher.findUnique as jest.Mock).mockResolvedValue(mockTeacherWithStudents);

      const result = await getAllStudentsByTeacher();

      expect(result.allStudents).toEqual(mockTeacherWithStudents.students);
      expect(result.combinedAnswers).toEqual([
        { id: "answer1", question: { type: "MCQ" } },
        { id: "answer2", question: { type: "Fill in the blank" } },
        { id: "answer3", question: { type: "MCQ" } },
        { id: "answer4", question: { type: "Short answer" } },
      ]);
    });

    it("should return empty arrays if no session is found", async () => {
      (auth as jest.Mock).mockResolvedValue(null);

      const result = await getAllStudentsByTeacher();

      expect(result.allStudents).toEqual([]);
      expect(result.combinedAnswers).toEqual([]);
    });

    it("should handle errors gracefully", async () => {
      const mockSession = { user: { id: "teacher123" } };
      const mockError = new Error("Database error");

      (auth as jest.Mock).mockResolvedValue(mockSession);
      (db.teacher.findUnique as jest.Mock).mockRejectedValue(mockError);

      const result = await getAllStudentsByTeacher();

      expect(result.allStudents).toEqual([]);
      expect(result.combinedAnswers).toEqual([]);
    });
  });
});