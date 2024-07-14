import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import "next-auth/jwt";

export type ExtendUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles: AuthRole[];
  }
}
