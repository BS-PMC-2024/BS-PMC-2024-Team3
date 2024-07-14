import { db } from "@/lib/db";

export const getVerficationTokenByEmail = async (email: string) => {
  try {
    const VerficationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return VerficationToken;
  } catch {
    return null;
  }
};

export const getVerficationTokenByToken = async (token: string) => {
  try {
    const VerficationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return VerficationToken;
  } catch {
    return null;
  }
};
