import { reset } from "../actions/reset";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";

// Mock the dependencies
jest.mock("@/data/user");
jest.mock("@/lib/mail");

const mockedGetUserByEmail = getUserByEmail as jest.MockedFunction<typeof getUserByEmail>;
const mockedSendPasswordResetEmail = sendPasswordResetEmail as jest.MockedFunction<typeof sendPasswordResetEmail>;

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
    expect(mockedGetUserByEmail).toHaveBeenCalledWith("nonexistent@example.com");
  });

  // Add additional tests if needed
});