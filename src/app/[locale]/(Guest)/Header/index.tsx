import LanguegeMenu from "@/app/[locale]/(Guest)/Header/LanguegeMenu";
import ThemeToggle from "@/app/[locale]/(Guest)/Header/ThemeToggle";
import Ripple from "@/components/ui/Ripple";
import { getUserFromToken } from "@/lib/auth";
import Link from "next/link";
import Cart from "./Cart";
import MobileDrawer from "./MobileDrawer";
import Search from "./Search";
import SubHeader from "./SubHeader";
import UserMenuDropdown from "./UserMenuDropdown";

export default async function Header() {
  const user = await getUserFromToken();
  const isLoggedIn = !!user;

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
      {/* MOBILE TOP ROW - LOGO ONLY (Ikut ter-scroll hilang ke atas) */}
      <div className="md:hidden bg-background-default pt-4 pb-1 px-4 flex justify-between items-center">
        {Logo}
      </div>

      {/* MAIN NAVBAR - STICKY (Glassmorphism Effect) */}
      <div className="sticky top-0 z-50 bg-background-paper/90 backdrop-blur-md border-b border-divider/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0 md:h-20 flex items-center justify-between gap-3 md:gap-6">
          {/* DESKTOP LOGO (Tersembunyi di Mobile) */}
          <div className="hidden md:block shrink-0">{Logo}</div>

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
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* System Utilities */}
            <ThemeToggle />
            <LanguegeMenu />

            <div className="h-5 w-px bg-divider mx-2" />

            {/* User Utilities */}
            <Cart />

            {isLoggedIn ? (
              <UserMenuDropdown userRole={user.role} />
            ) : (
              <div className="flex items-center">
                <div className="flex items-center gap-2 p-1 bg-background-default/50 border border-divider rounded-2xl shadow-inner group/nav">
                  {/* Button: Login */}
                  <Link
                    href="/login"
                    className="group/login relative flex items-center gap-2.5 px-5 py-2.5 text-xs font-black text-text-secondary hover:text-primary-main hover:bg-white dark:hover:bg-background-paper rounded-xl transition-all duration-300"
                  >
                    <Ripple color="primary" />
                    <svg
                      className="w-4 h-4 opacity-60 group-hover/login:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="tracking-[0.15em] uppercase">Login</span>
                  </Link>

                  {/* Button: Sign Up / Join System */}
                  <Link
                    href="/register"
                    className="group/join relative flex items-center gap-2.5 px-6 py-2.5 text-xs font-black bg-primary-main text-white hover:bg-primary-dark rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <Ripple />
                    <span className="tracking-[0.15em] uppercase">
                      Join_System
                    </span>
                    <svg
                      className="w-4 h-4 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SubHeader />
    </>
  );
}
