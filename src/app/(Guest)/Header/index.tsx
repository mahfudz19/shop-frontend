import ThemeToggle from "@/components/ThemeToggle";
import RoutePulseBar from "@/components/ui/RoutePulseBar";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../(home)/LogoutButton";
import Search from "./Search";
import SubHeader from "./SubHeader";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const isLoggedIn = !!token;

  return (
    <header className="sticky top-0 z-50">
      <RoutePulseBar />
      {/* MAIN NAVBAR - Glassmorphism Effect */}
      <div className="bg-background-paper/80 backdrop-blur-lg border-b border-divider/50 shadow-sm transition-all duration-300">
        {/* RESPONSIVE CONTAINER: flex-wrap untuk mobile, flex-nowrap untuk desktop */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0 md:h-20 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 gap-x-4">
          {/* LOGO AREA - Urutan 1 */}
          <Link href="/" className="shrink-0 group order-1">
            <div className="flex flex-col">
              <span className="text-[9px] md:text-[10px] font-black text-primary-main uppercase tracking-[0.3em] leading-none mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                AI_ENGINE
              </span>
              <span className="text-xl md:text-2xl lg:text-3xl font-black text-text-primary tracking-tighter leading-none group-hover:text-primary-main transition-colors">
                {process.env.NEXT_PUBLIC_APP_NAME || "ScrapStore"}
                <span className="text-primary-main">.</span>
              </span>
            </div>
          </Link>

          {/* UTILITY ACTIONS - Urutan 2 (Mobile) / Urutan 3 (Desktop) */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0 order-2 md:order-3">
            <ThemeToggle />

            <div className="h-5 w-px bg-divider mx-0.5 md:mx-1" />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="text-xs font-black text-text-secondary hover:text-primary-main uppercase tracking-widest transition-colors hidden sm:block"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center gap-1.5 md:gap-2">
                <Link
                  href="/login"
                  className="px-2 md:px-4 py-2 text-xs md:text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-main text-primary-contrast px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* ANALYTICAL SEARCH BAR - Urutan 3 (Mobile) / Urutan 2 (Desktop) */}
          <div className="w-full md:w-auto md:flex-1 order-3 md:order-2">
            <Search />
          </div>
        </div>
      </div>

      {/* SUB-HEADER: CATEGORIES & BREADCRUMBS */}
      <SubHeader />
    </header>
  );
}
