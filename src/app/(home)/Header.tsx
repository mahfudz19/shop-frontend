import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  breadcrumbs?: { name: string; href: string }[];
}
export default async function Header({ breadcrumbs }: HeaderProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const isLoggedIn = !!token;

  const mainCategories = [
    "Auto & Motorcycle",
    "Baby & Kids",
    "Hardware Store",
    "Clothing",
    "Electronics",
    "Garden",
    "Health",
    "Home & Kitchen",
  ];

  return (
    <header className="bg-background-paper border-b border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">
        <Link href="/" className="shrink-0">
          <span className="text-3xl font-black text-primary-main tracking-tighter">
            {process.env.NEXT_PUBLIC_APP_NAME || "ScrapStore"}
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl flex items-center border border-divider rounded-md overflow-hidden focus-within:border-secondary-main transition-colors shadow-sm">
          <input
            type="text"
            placeholder="Search products, brands, or EAN..."
            className="flex-1 px-4 py-2 text-sm outline-none text-text-primary bg-background-paper"
          />
          <button className="bg-secondary-main hover:bg-secondary-dark text-secondary-contrast px-8 py-3 font-bold transition-colors">
            Search
          </button>
        </div>

        {/* Navigasi Kanan */}
        <div className="flex items-center gap-4 text-text-secondary">
          <button className="hidden lg:block text-sm font-bold hover:text-primary-main transition px-2">
            Flights
          </button>

          {/* TOMBOL TOGGLE THEME DI SINI */}
          <ThemeToggle />

          <Link
            href="/wishlist"
            className="flex flex-col items-center gap-1 hover:text-primary-main transition px-2"
          >
            <span className="text-xl">❤️</span>
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-3 border-l border-divider pl-4 ml-2">
              <Link
                href="/admin"
                className="text-sm font-bold hover:text-primary-main transition"
              >
                My {process.env.NEXT_PUBLIC_APP_NAME}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 hover:text-primary-main transition border-l border-divider pl-4 ml-2"
            >
              <span className="text-sm font-bold">
                My {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Logic Breadcrumbs & Sticky Nav */}
      {breadcrumbs ? (
        <nav className="bg-background-default border-b border-divider text-sm px-4 py-2 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            {breadcrumbs.map((crumb, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-text-secondary hover:text-primary-main transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-text-primary font-medium">
                      {crumb.name}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <span className="text-text-disabled">/</span>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      ) : (
        <div className="bg-secondary-main text-secondary-contrast sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar gap-8 h-12 items-center text-sm font-bold whitespace-nowrap">
            {mainCategories.map((cat) => (
              <Link
                key={cat}
                href={`/search/${cat}`}
                className="hover:opacity-80 transition-opacity"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
