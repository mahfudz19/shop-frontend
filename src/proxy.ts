import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = /^\/(id\/)?(login|register)/.test(pathname);
  const localeMatch = pathname.match(/^\/(id)\//);
  const prefix = localeMatch ? `/${localeMatch[1]}` : "";

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(`${prefix}/`, request.url));
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};