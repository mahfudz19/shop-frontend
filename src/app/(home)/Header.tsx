import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

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
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">
        <Link href="/" className="shrink-0">
          <span className="text-3xl font-black text-blue-600 tracking-tighter">
            {process.env.NEXT_PUBLIC_APP_NAME || "ScrapStore"}
          </span>
        </Link>

        <div className="flex-1 max-w-3xl flex items-center border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-orange-500 transition-colors">
          <select className="bg-gray-50 px-4 py-2 border-r border-gray-200 text-sm font-medium outline-none hidden md:block text-gray-700">
            <option>All Categories</option>
          </select>
          <input
            type="text"
            placeholder="Search products, brands, or EAN..."
            className="flex-1 px-4 py-2 text-sm outline-none text-gray-800"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-bold transition-colors">
            Search
          </button>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <button className="hidden lg:block text-sm font-bold hover:text-blue-600 transition">
            Flights
          </button>
          <Link
            href="/wishlist"
            className="flex flex-col items-center gap-1 hover:text-blue-600 transition"
          >
            <span className="text-xl">❤️</span>
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="text-sm font-bold hover:text-blue-600 transition"
              >
                My {process.env.NEXT_PUBLIC_APP_NAME}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center gap-1 hover:text-blue-600 transition"
            >
              <span className="text-sm font-bold">
                My {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Link>
          )}
        </div>
      </div>

      {breadcrumbs ? (
        <nav className="bg-gray-100 text-sm text-gray-500 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            {breadcrumbs.map((crumb, idx) => {
              return (
                <div key={idx} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-gray-900">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <span className="text-gray-400">/</span>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      ) : (
        <div className="bg-orange-500 text-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar gap-8 h-12 items-center text-sm font-bold whitespace-nowrap">
            {mainCategories.map((cat) => (
              <Link
                key={cat}
                href={`/search/${cat}`}
                className="hover:text-black transition-colors"
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
