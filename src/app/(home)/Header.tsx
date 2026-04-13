import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const isLoggedIn = !!token;

  const mainCategories = [
    "Auto & Motorrad",
    "Baby & Kind",
    "Baumarkt",
    "Bekleidung",
    "Elektronik",
    "Garten",
    "Gesundheit",
    "Haushalt",
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Header Atas: White Background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-3xl font-black text-blue-600 tracking-tighter">
            {process.env.NEXT_PUBLIC_APP_NAME || "ScrapStore"}
          </span>
        </Link>

        {/* Search Bar Raksasa (Dominasi Tengah) */}
        <div className="flex-1 max-w-3xl flex items-center border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-orange-500 transition-colors">
          <select className="bg-gray-50 px-4 py-2 border-r border-gray-200 text-sm font-medium outline-none hidden md:block">
            <option>Alle Kategorien</option>
          </select>
          <input
            type="text"
            placeholder="Produk, Marke atau EAN mencari..."
            className="flex-1 px-4 py-2 text-sm outline-none"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-bold transition-colors">
            Cari
          </button>
        </div>

        {/* Icons Right */}
        <div className="flex items-center gap-6 text-gray-600">
          <button className="hidden lg:block text-sm font-bold hover:text-blue-600 transition">
            Flug
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
                Mein {process.env.NEXT_PUBLIC_APP_NAME}
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center gap-1 hover:text-blue-600 transition"
            >
              <span className="text-sm font-bold">
                Mein {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Navigasi Utama: Sticky Orange Bar */}
      <div className="bg-orange-500 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar gap-8 h-12 items-center text-sm font-bold whitespace-nowrap">
          {mainCategories.map((cat) => (
            <Link
              key={cat}
              href={`/?search=${cat}`}
              className="hover:text-black transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
