import LanguegeMenu from "@/app/[locale]/(Guest)/Header/LanguegeMenu";
import ThemeToggle from "@/app/[locale]/(Guest)/Header/ThemeToggle";
import Ripple from "@/components/ui/Ripple";
import RoutePulseBar from "@/components/ui/RoutePulseBar";
import { getUserFromToken } from "@/lib/auth";
import Link from "next/link";
import LogoutButton from "../(home)/LogoutButton";
import MobileDrawer from "./MobileDrawer";
import Search from "./Search";
import SubHeader from "./SubHeader";

export default async function Header() {
  const user = await getUserFromToken();
  const isLoggedIn = !!user;
  console.log("User di Header:", user);

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
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <ThemeToggle />
            <LanguegeMenu />

            <div className="h-5 w-px bg-divider mx-1" />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-xs font-black text-text-secondary hover:text-primary-main uppercase tracking-widest transition-colors"
                  >
                    Console
                  </Link>
                )}
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="flex items-center border border-divider rounded-md overflow-hidden bg-background-paper shadow-sm">
                  {/* Button: Login */}
                  <Link
                    href="/login"
                    className="group relative flex items-center gap-2 px-4 py-2 text-xs font-bold text-text-secondary hover:text-primary-main hover:bg-primary-main/5 transition-all font-mono"
                  >
                    <Ripple color="primary" />
                    {/* Icon: System User */}
                    <svg
                      className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="tracking-widest uppercase">Login</span>
                  </Link>

                  {/* Divider Line */}
                  <div className="h-4 w-px bg-divider opacity-50"></div>

                  {/* Button: Sign Up */}
                  <Link
                    href="/register"
                    className="group relative flex items-center gap-2 px-4 py-2 text-xs font-black bg-primary-main text-primary-contrast hover:bg-primary-dark transition-all font-mono"
                  >
                    <Ripple />
                    <span className="tracking-widest uppercase">
                      Join_System
                    </span>
                    {/* Icon: Scan/Plus */}
                    <svg
                      className="w-3.5 h-3.5 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
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

      {/* SUB-HEADER: CATEGORIES & BREADCRUMBS */}
      <SubHeader />
    </>
  );
}
