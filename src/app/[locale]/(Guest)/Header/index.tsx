import ThemeToggle from "@/app/[locale]/(Guest)/Header/ThemeToggle";
import RoutePulseBar from "@/components/ui/RoutePulseBar";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../(home)/LogoutButton";
import Search from "./Search";
import SubHeader from "./SubHeader";
import Ripple from "@/components/ui/Ripple";
import LanguegeMenu from "@/app/[locale]/(Guest)/Header/LanguegeMenu";
import MobileDrawer from "./MobileDrawer";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const isLoggedIn = !!token;

  // Render Logo diekstrak agar bisa dipakai ganda (Mobile non-sticky, Desktop sticky)
  const Logo = (
    <Link href="/" className="shrink-0 group flex flex-col">
      <span className="text-[9px] md:text-[10px] font-black text-primary-main uppercase tracking-[0.3em] leading-none mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
        AI_ENGINE
      </span>
      <span className="text-xl md:text-2xl lg:text-3xl font-black text-text-primary tracking-tighter leading-none group-hover:text-primary-main transition-colors">
        {process.env.NEXT_PUBLIC_APP_NAME || "ScrapStore"}
        <span className="text-primary-main">.</span>
      </span>
    </Link>
  );

  return (
    <>
      <RoutePulseBar />

      {/* MOBILE TOP ROW - LOGO ONLY (Ikut ter-scroll hilang ke atas) */}
      <div className="md:hidden bg-background-default pt-4 pb-1 px-4 flex justify-between items-center">
        {Logo}
      </div>

      {/* MAIN NAVBAR - STICKY (Glassmorphism Effect) */}
      <div className="sticky top-0 z-50 bg-background-paper/90 backdrop-blur-md border-b border-divider/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0 md:h-20 flex items-center justify-between gap-3 md:gap-6">
          
          {/* DESKTOP LOGO (Tersembunyi di Mobile) */}
          <div className="hidden md:block shrink-0">
            {Logo}
          </div>

          {/* ANALYTICAL SEARCH BAR (Full width di mobile, mengisi celah di desktop) */}
          <div className="flex-1 w-full relative">
            <Search />
          </div>

          {/* MOBILE DRAWER TRIGGER (Tersembunyi di Desktop) */}
          {/* Tombol Laci sejajar tepat di sebelah kanan kolom *Input Search* khusus untuk layar Mobile */}
          <div className="md:hidden shrink-0 flex items-center">
            <MobileDrawer isLoggedIn={isLoggedIn} />
          </div>

          {/* DESKTOP UTILITY ACTIONS (Tersembunyi di Mobile) */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <ThemeToggle />
            <LanguegeMenu />

            <div className="h-5 w-px bg-divider mx-1" />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="text-xs font-black text-text-secondary hover:text-primary-main uppercase tracking-widest transition-colors"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-full text-sm font-bold text-text-secondary hover:text-text-primary transition-colors relative overflow-hidden group/btn"
                >
                  <Ripple color="primary" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-main text-primary-contrast px-5 py-2 rounded-full text-sm font-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all relative overflow-hidden"
                >
                  <Ripple />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SUB-HEADER: CATEGORIES & BREADCRUMBS */}
      <SubHeader />
    </>
  );
}
