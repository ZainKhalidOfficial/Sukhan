import { clerkMiddleware } from '@clerk/nextjs/server';


export default clerkMiddleware({});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   console.log("Middleware hit for:", req.nextUrl.pathname);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/:path*",
// };