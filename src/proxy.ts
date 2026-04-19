import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Hanya memproteksi rute /admin (dan prefix bahasanya jika ada)
  const isAdminRoute = /^\/(id\/)?admin/.test(pathname);
  // Rute Auth
  const isAuthRoute = /^\/(id\/)?(login|register)/.test(pathname);

  // Ambil prefix bahasa saat ini untuk mempertahankan bahasa saat redirect
  const localeMatch = pathname.match(/^\/(id)\//);
  const prefix = localeMatch ? `/${localeMatch[1]}` : '';

  // SKENARIO 1: Belum login tapi akses /admin -> Lempar ke /login
  if (!token && isAdminRoute) {
    return NextResponse.redirect(new URL(`${prefix}/login`, request.url));
  }

  // SKENARIO 2: Sudah login tapi akses /login atau /register -> Lempar ke Home (/)
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(`${prefix}/`, request.url));
  }

  /* CATATAN SOAL ROLE (Admin vs User Biasa):
    Saat ini kita tidak bisa mengecek role di middleware karena token JWT dari Golang Anda 
    belum memuat data "role". Nanti jika di Golang Anda sudah menambahkan role ke payload JWT, 
    kita bisa memecah token di sini untuk mengecek apakah role-nya "admin" atau bukan.
  */

  // Jika aman, teruskan ke proxy multi-bahasa next-intl
  return intlProxy(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};