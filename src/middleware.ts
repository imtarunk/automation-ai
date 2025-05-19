import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicPaths = [
  "/",
  "/api/clerk-webhook",
  "/api/drive-activity/notification",
  "/api/payment/success",
];

const ignoredPaths = [
  "/api/auth/callback/discord",
  "/api/auth/callback/notion",
  "/api/auth/callback/slack",
  "/api/flow",
  "/api/cron/wait",
];

export default clerkMiddleware((auth, req) => {
  if (publicPaths.includes(req.nextUrl.pathname)) return NextResponse.next();
  if (ignoredPaths.includes(req.nextUrl.pathname)) return NextResponse.next();
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly
