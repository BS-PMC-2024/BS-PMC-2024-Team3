import request from "supertest";
import { createServer } from "http";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  studentStats,
  getAllStudentsByTeacher,
} from "../lib/ServerActions/ServerActions";

// Mock the necessary modules
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

// Create a mock server
const server = createServer((req, res) => {
  if (req.url?.startsWith("/api/studentStats") && req.method === "GET") {
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const userId = urlParams.get("userId") || undefined;
    studentStats(userId)
      .then((data) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      });
  } else if (
    req.url === "/api/getAllStudentsByTeacher" &&
    req.method === "GET"
  ) {
    getAllStudentsByTeacher()
      .then((data) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(data));
      })
      .catch((err) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("ServerActions Integration Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("studentStats", () => {
    it("should return student answers if userId is provided", async () => {
      const mockUserId = "user123";
      const mockAnswers = [
        { id: "answer1", studentId: mockUserId, question: { type: "MCQ" } },
        {
          id: "answer2",
          studentId: mockUserId,
          question: { type: "Fill in the blank" },
        },
      ];

      (db.studentAnswer.findMany as jest.Mock).mockResolvedValue(mockAnswers);

      const response = await request(server).get(
        `/api/studentStats?userId=${mockUserId}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAnswers);
    });

    it("should handle errors gracefully", async () => {
      const mockUserId = "user123";
      const mockError = new Error("Database error");

      (db.studentAnswer.findMany as jest.Mock).mockRejectedValue(mockError);

      const response = await request(server).get(
        `/api/studentStats?userId=${mockUserId}`
      );

      expect(response.status).toBe(500);
      expect(response.body.error).toBe(mockError.message);
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
      (db.teacher.findUnique as jest.Mock).mockResolvedValue(
        mockTeacherWithStudents
      );

      const response = await request(server).get(
        "/api/getAllStudentsByTeacher"
      );

      expect(response.status).toBe(200);
      expect(response.body.allStudents).toEqual(
        mockTeacherWithStudents.students
      );
      expect(response.body.combinedAnswers).toEqual([
        { id: "answer1", question: { type: "MCQ" } },
        { id: "answer2", question: { type: "Fill in the blank" } },
        { id: "answer3", question: { type: "MCQ" } },
        { id: "answer4", question: { type: "Short answer" } },
      ]);
    });
  });
});
