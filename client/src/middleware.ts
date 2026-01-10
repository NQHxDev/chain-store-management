import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/account', '/settings'];

export function middleware(req: NextRequest) {
   const refreshToken = req.cookies.get('refreshToken');
   const { pathname } = req.nextUrl;

   const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

   if (isProtectedRoute && !refreshToken) {
      return NextResponse.redirect(new URL('/login', req.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/dashboard/:path*', '/account/:path*', '/settings/:path*'],
};
