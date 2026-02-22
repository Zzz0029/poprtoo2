import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Protect /admin routes (except /admin/login)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const hasSession = request.cookies.has('admin_session');

        if (!hasSession) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // If logged in and trying to hit /admin/login, redirect to /admin dashboard
    if (pathname === '/admin/login') {
        if (request.cookies.has('admin_session')) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
