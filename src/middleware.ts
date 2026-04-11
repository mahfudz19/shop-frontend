import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Asumsi nanti Golang mengirim cookie bernama "auth_token"
  const token = request.cookies.get('auth_token')?.value;

  // Rute yang butuh login
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/admin');
  
  // Rute auth (tidak boleh diakses kalau sudah login)
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

  // Jika belum login, tapi akses rute admin/dashboard -> Lempar ke login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah login, tapi akses halaman login -> Lempar ke dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Tentukan middleware berjalan di rute mana saja
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register'],
};