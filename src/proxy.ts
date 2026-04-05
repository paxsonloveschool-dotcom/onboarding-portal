import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Public routes - no auth required
  const publicPaths = ['/', '/login', '/register', '/api/auth', '/api/admin/register'];
  const isPublic = publicPaths.some((p) =>
    pathname === p || pathname.startsWith('/api/auth')
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes require admin role
  if (pathname.startsWith('/admin') || (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/register'))) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Team-specific routes - ensure user accesses their own team portal
  if (pathname.startsWith('/hp-landscaping') && token.team !== 'hp') {
    const correctPath = pathname.replace('/hp-landscaping', '/restore');
    return NextResponse.redirect(new URL(correctPath, req.url));
  }

  if (pathname.startsWith('/restore') && token.team !== 'restore') {
    const correctPath = pathname.replace('/restore', '/hp-landscaping');
    return NextResponse.redirect(new URL(correctPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sops|.*\\.svg$).*)',
  ],
};
