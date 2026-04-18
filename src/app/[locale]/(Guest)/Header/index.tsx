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

  return (
    <>
      {/* MAIN NAVBAR - Glassmorphism Effect */}
      <div className="md:sticky top-0 z-50 bg-background-paper/80 backdrop-blur-lg border-b border-divider/50 shadow-sm transition-all duration-300">
        <RoutePulseBar />
        {/* RESPONSIVE CONTAINER: flex-wrap untuk mobile, flex-nowrap untuk desktop */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-0 md:h-20 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4 gap-x-4">
          
          {/* HEADER TOP ROW (Mobile) / Left Content (Desktop) */}
          <div className="flex items-center justify-between w-full md:w-auto order-1">
            {/* LOGO AREA */}
            <Link href="/" className="shrink-0 group">
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

            {/* MOBILE DRAWER TRIGGER (Hidden on Desktop) */}
            <MobileDrawer isLoggedIn={isLoggedIn} />
          </div>

          {/* ANALYTICAL SEARCH BAR - Row 2 (Mobile) / Center (Desktop) */}
          <div className="w-full md:w-auto md:flex-1 order-3 md:order-2">
            <Search />
          </div>

          {/* DESKTOP UTILITY ACTIONS - Hidden on Mobile / Right Content (Desktop) */}
          <div className="hidden md:flex items-center gap-4 shrink-0 order-2 md:order-3">
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
