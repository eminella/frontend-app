// frontend-app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔐 ADMIN PANEL KORUMA
  const isLoggedIn = req.cookies.get('admin-auth')?.value === 'true';
  const isLoginPage = pathname === '/admin/login';
  const isAdminPage = pathname.startsWith('/admin') && !isLoginPage;

  if (isAdminPage && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // 🔄 ESKİ YÖNLENDİRME KURALLARI
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/store';
    return NextResponse.redirect(url);
  }

  if (/^\/\d+$/.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/store${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/:path(\\d+)', '/admin/:path*'],
};
