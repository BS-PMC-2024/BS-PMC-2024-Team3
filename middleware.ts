import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
  STUDENT_LOGIN_REDIRECT,
  TEACHER_LOGIN_REDIRECT,
  ADMIN_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
  studentRoutes,
  teacherRoutes,
  TeacherNotApprovedRoute,
  DEFAULT_LOGIN_REDIRECT,
  TEACHERNOTAPPROVED_LOGIN_REDIRECT,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!req.auth;
  const userRole = auth?.user.role || "";
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);
  const isTeacherRoute = nextUrl.pathname.startsWith(teacherRoutes);
  const isTeacherNotApprovedRoute = nextUrl.pathname.startsWith(
    TeacherNotApprovedRoute
  );
  const isStudentRoute = nextUrl.pathname.startsWith(studentRoutes);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  } else if (userRole === "ADMIN" && !isAdminRoute && !isPublicRoute) {
    return Response.redirect(new URL(ADMIN_LOGIN_REDIRECT, nextUrl));
  } else if (userRole === "STUDENT" && !isStudentRoute && !isPublicRoute) {
    return Response.redirect(new URL(STUDENT_LOGIN_REDIRECT, nextUrl));
  } else if (userRole === "TEACHER" && !isTeacherRoute && !isPublicRoute) {
    return Response.redirect(new URL(TEACHER_LOGIN_REDIRECT, nextUrl));
  } else if (
    userRole === "TEACHERNOTAPPROVED" &&
    !isTeacherNotApprovedRoute &&
    !isPublicRoute
  ) {
    return Response.redirect(
      new URL(TEACHERNOTAPPROVED_LOGIN_REDIRECT, nextUrl)
    );
  }
  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
