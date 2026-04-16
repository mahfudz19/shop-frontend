"use client";

import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [query, setQuery] = useState(
    params.search && typeof params.search === "string"
      ? decodeURIComponent(params.search)
      : "",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const hasValue = query.length > 0;

  return (
    <div className="w-full relative group">
      {/* Icon Search (kiri) */}
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-disabled group-focus-within:text-primary-main transition-colors">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pindai produk, merk, atau EAN..."
          className="w-full bg-divider/20 border border-divider/50 rounded-full py-2.5 pl-11 pr-4 text-sm font-medium outline-none focus:bg-background-paper focus:border-primary-main focus:ring-4 focus:ring-primary-main/10 transition-all placeholder:text-text-disabled/70"
        />
      </form>

      {/* Right Element: Icon Clear atau SEARCH_SYS */}
      <div className="absolute inset-y-0 right-3 flex items-center">
        {hasValue ? (
          // Icon Hapus (X)
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-divider/50 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Hapus pencarian"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          // Label SEARCH_SYS (Sembunyi di mobile agar lega)
          <span className="hidden sm:inline-block text-[9px] font-bold bg-divider/40 text-text-secondary px-2 py-1 rounded-md border border-divider/50">
            SEARCH_SYS
          </span>
        )}
      </div>
    </div>
  );
}

export default Search;
