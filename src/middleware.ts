import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = (req: Request) => {
  const url = new URL(req.url);
  return url.pathname.startsWith('/dashboard') || 
         url.pathname.startsWith('/api/payment') || 
         url.pathname.startsWith('/callback');
};

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    return auth.protect().then(() => NextResponse.next());
  }
  return NextResponse.next();
});

export const config = {
  runtime: "experimental-edge",
  regions: ["fra1"],
  matcher: [
    // Protected routes
    '/dashboard/:path*',
    '/api/payment/:path*',
    '/callback/:path*',
    
    // Skip static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};