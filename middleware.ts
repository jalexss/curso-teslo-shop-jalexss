import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {

    const { pathname } = req.nextUrl;
    const { role } = req.nextauth.token?.user as any;
    const validRoles = ['admin', 'client', 'super-user', 'SEO'];

    if (!validRoles.includes(role)) return NextResponse.redirect(new URL('/', req.url));

    if (pathname.startsWith('/checkout')) return NextResponse.next();

    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
      if (role !== 'admin') return NextResponse.redirect(new URL('/', req.url));

      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*']
};