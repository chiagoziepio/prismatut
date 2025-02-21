import { NextResponse } from "next/server";

import { apiAuthRoutePrefix, authRoutes, DEFAULT_REDIRECT } from "../routes";
import NextAuth from "next-auth";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedin = !!req.auth;
  // console.log("loggedin:", isLoggedin);
  // console.log("route:", req.nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthRoutePrefix);

  if (isApiAuthRoute) {
    console.log("isApiAuthRoute");
    return NextResponse.next();
  }
  if (isAuthRoute) {
    console.log("isAuthRoute");

    if (isLoggedin) {
      console.log("isLoggedin");

      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  const requestHeaders = new Headers(req.headers);

  if (req.auth?.user?.id) {
    requestHeaders.set("x-user-id", req.auth.user.id);
  }

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Exclude static files and Next.js internals
    "/", // Include the root path
    "/(api|trpc)(.*)", // Include API and tRPC routes
  ],
};
