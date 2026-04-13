import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  // 1. Baca isi cookie langsung dari Server
  // Di Next.js 15, cookies() bersifat asynchronous (Promise)
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // 2. Tentukan status login berdasarkan keberadaan token
  const isLoggedIn = !!token;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="text-2xl font-black text-blue-600">
              {process.env.NEXT_PUBLIC_APP_NAME || "ScrapStore"}
            </span>
          </Link>
        </div>

        {/* NAVIGASI CERDAS */}
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/admin"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Dashboard Admin
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Daftar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
