import { getVerficationTokenByEmail } from "@/data/verfication-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exitingToken = await getPasswordResetTokenByEmail(email);
  if (exitingToken) {
    await db.passwordResetToken.delete({
      where: { id: exitingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};

export const generateVerficiationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exitingToken = await getVerficationTokenByEmail(email);
  if (exitingToken) {
    await db.verificationToken.delete({
      where: { id: exitingToken.id },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};
