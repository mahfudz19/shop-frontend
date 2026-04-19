import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { parseJwt } from "./lib/auth";

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = /^\/(id\/)?admin/.test(pathname);
  const isAuthRoute = /^\/(id\/)?(login|register)/.test(pathname);

  const localeMatch = pathname.match(/^\/(id)\//);
  const prefix = localeMatch ? `/${localeMatch[1]}` : "";

  // SKENARIO 1: Belum login tapi akses /admin -> Lempar ke /login
  if (!token && isAdminRoute) {
    return NextResponse.redirect(new URL(`${prefix}/login`, request.url));
  }

  // Jika user punya token, mari kita bongkar isinya
  let userRole = "";
  if (token) {
    const decodedPayload = parseJwt(token);
    if (decodedPayload && decodedPayload.role) {
      userRole = decodedPayload.role;
    }
  }

  // SKENARIO 2: Sudah login tapi mencoba akses /login atau /register -> Lempar ke Home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(`${prefix}/`, request.url));
  }

  // SKENARIO 3: User biasa (bukan admin) mencoba masuk ke /admin -> Lempar ke Home
  if (token && isAdminRoute && userRole !== "admin") {
    // Anda bisa melemparnya ke halaman /403 atau langsung ke beranda
    return NextResponse.redirect(new URL(`${prefix}/`, request.url));
  }

  // Jika aman (Admin masuk /admin, atau user biasa masuk halaman publik), teruskan
  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
