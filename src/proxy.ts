import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Inisialisasi proxy dari next-intl
const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Cek rute dengan regex agar mendukung prefix bahasa opsional (misal: /id/admin atau /admin)
  const isProtectedRoute = /^\/(id\/)?(dashboard|admin)/.test(pathname);
  const isAuthRoute = /^\/(id\/)?(login|register)/.test(pathname);

  if (!token && isProtectedRoute) {
    const localeMatch = pathname.match(/^\/(id)\//);
    const prefix = localeMatch ? `/${localeMatch[1]}` : '';
    return NextResponse.redirect(new URL(`${prefix}/login`, request.url));
  }

  if (token && isAuthRoute) {
    const localeMatch = pathname.match(/^\/(id)\//);
    const prefix = localeMatch ? `/${localeMatch[1]}` : '';
    return NextResponse.redirect(new URL(`${prefix}/dashboard`, request.url));
  }

  // Jika aman, teruskan ke proxy multi-bahasa next-intl
  return intlProxy(request);
}

export const config = {
  // Wajib menangkap semua rute KECUALI file statis dan Next internal
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};