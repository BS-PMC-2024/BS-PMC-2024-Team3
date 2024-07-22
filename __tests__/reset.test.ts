import { reset } from "../actions/reset";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { UserRole } from "@prisma/client";

// Mock the dependencies
jest.mock("@/data/user");
jest.mock("@/lib/mail");
jest.mock("@/lib/tokens");

const mockedGetUserByEmail = getUserByEmail as jest.MockedFunction<
  typeof getUserByEmail
>;
const mockedSendPasswordResetEmail =
  sendPasswordResetEmail as jest.MockedFunction<typeof sendPasswordResetEmail>;
const mockedGeneratePasswordResetToken =
  generatePasswordResetToken as jest.MockedFunction<
    typeof generatePasswordResetToken
  >;

describe("reset function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error for invalid email format", async () => {
    const result = await reset({ email: "invalid-email" });
    expect(result).toEqual({ error: "אימייל לא תקין" });
  });

  it("should return an error if email does not exist in the system", async () => {
    mockedGetUserByEmail.mockResolvedValueOnce(null);

    const result = await reset({ email: "nonexistent@example.com" });
    expect(result).toEqual({ error: "לא קיים אימייל כזה במערכת" });
    expect(mockedGetUserByEmail).toHaveBeenCalledWith(
      "nonexistent@example.com"
    );
  });

  it("should send password reset email for valid email", async () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "existent@example.com",
      emailVerified: null,
      image: null,
      password: null,
      role: UserRole.STUDENT,
    };
    const mockToken = {
      id: "1",
      email: "existent@example.com",
      token: "reset-token",
      expires: new Date(),
    };

    mockedGetUserByEmail.mockResolvedValueOnce(mockUser);
    mockedGeneratePasswordResetToken.mockResolvedValueOnce(mockToken);

    const result = await reset({ email: "existent@example.com" });

    expect(result).toEqual({ success: "נשלח מייל" });
    expect(mockedGetUserByEmail).toHaveBeenCalledWith("existent@example.com");
    expect(mockedGeneratePasswordResetToken).toHaveBeenCalledWith(
      "existent@example.com"
    );
    expect(mockedSendPasswordResetEmail).toHaveBeenCalledWith(
      "existent@example.com",
      "reset-token"
    );
  });
});
