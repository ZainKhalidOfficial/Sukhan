import { clerkMiddleware, createRouteMatcher  } from '@clerk/nextjs/server';


const isPublicRoute = createRouteMatcher(['/', "/api/webhooks/stripe"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})


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