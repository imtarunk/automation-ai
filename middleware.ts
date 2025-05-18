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
  const path = req.nextUrl.pathname;

  if (publicPaths.includes(path) || ignoredPaths.includes(path)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
