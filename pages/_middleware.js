import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req, event) {
  const { pathname, origin } = req.nextUrl;

  /**
   * token will exist if the user is logged in
   */
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_JWT_SECRET });

  /** Allow the request to continue
   * if the user is logged in (token exists)
   * or the request is for the login page
   */
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  if (!pathname.includes('/login') && !token) {
    // if token does not exist, redirect to login
    return NextResponse.redirect(`${origin}/login`);
  }
}
