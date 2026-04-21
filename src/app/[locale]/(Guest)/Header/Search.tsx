"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Popover from "@/components/ui/Popover"; // Import komponen Popover
import { useRef } from "react";

const DUMMY_SUGGESTIONS = [
  { text: "iPhone 15 Pro Max", category: "Handphones & Tablets" },
  { text: "Samsung Galaxy S24 Ultra", category: "Handphones & Tablets" },
  { text: "Sony WH-1000XM5", category: "Audio & Headphones" },
  { text: "MacBook Pro M3", category: "Laptops & Computers" },
  { text: "Nintendo Switch OLED", category: "Gaming Consoles" },
  { text: "Nike Air Jordan 1", category: "Men's Shoes" },
];

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("Header.Search");

  const [query, setQuery] = useState(
    params.search && typeof params.search === "string"
      ? decodeURIComponent(params.search)
      : "",
  );

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load history on mount - tetap dipertahankan untuk keamanan hidrasi
  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse search history");
      }
    }
  }, []);

  // Sync dengan URL params
  useEffect(() => {
    setQuery(
      params.search && typeof params.search === "string"
        ? decodeURIComponent(params.search)
        : "",
    );
  }, [params.search]);

  const saveSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [
      trimmed,
      ...recentSearches.filter((s) => s !== trimmed),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const handleSearch = (term: string, closePopover: () => void) => {
    const trimmed = term.trim();
    if (trimmed) {
      saveSearch(trimmed);
      closePopover();
      router.push(`/search/${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (pathname !== "/") router.push("/");
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent_searches");
  };

  const hasValue = query.length > 0;

  const filteredSuggestions = query
    ? DUMMY_SUGGESTIONS.filter((s) =>
        s.text.toLowerCase().includes(query.toLowerCase()),
      )
    : DUMMY_SUGGESTIONS.slice(0, 3);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="font-black text-text-primary">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </span>
    );
  };

  return (
    <div className="w-full">
      <Popover
        position="bottom"
        className="w-[calc(100vw-32px)] sm:w-[480px] mt-2"
        classNameTrigger="w-full"
        lockScroll
        trigger={(isOpen) => (
          <div className="w-full relative group">
            {/* Icon Search (kiri) */}
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-disabled group-focus-within:text-primary-main transition-colors z-10">
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
            {/* Kita tidak menggunakan event focus di sini karena Popover sudah menangani onClick di trigger-nya */}
            <form
              onSubmit={(e) => {
                e.preventDefault(); /* Logic submit manual jika diperlukan */
              }}
              className="relative"
            >
              <input
                name="search"
                type="text"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("placeholder")}
                className="w-full bg-divider/10 border border-divider/40 rounded-full py-2.5 pl-11 pr-24 text-sm font-medium outline-none focus:bg-background-paper focus:border-primary-main focus:ring-4 focus:ring-primary-main/10 transition-all placeholder:text-text-disabled/70 truncate"
              />

              {/* Right Buttons */}
              <div className="absolute inset-y-1 right-1 flex items-center gap-1">
                {hasValue && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 rounded-full hover:bg-divider/30 text-text-secondary hover:text-text-primary transition-colors"
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
                )}
                {hasValue && (
                  <div className="w-[1px] h-4 bg-divider/50 mx-0.5" />
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah toggle popover saat ingin mencari
                    handleSearch(query, () => {}); // Cari tanpa menutup jika itu dari tombol ini (atau sesuaikan)
                  }}
                  className="h-full px-4 rounded-full bg-primary-main text-white hover:bg-primary-dark transition-all flex items-center justify-center group/btn shadow-lg shadow-primary-main/20 active:scale-95"
                >
                  <svg
                    className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
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
                  <span className="ml-2 text-[10px] font-black uppercase tracking-widest hidden md:inline">
                    GO
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      >
        {(close) => (
          <div className="backdrop-blur-xl bg-background-paper/95 overflow-hidden rounded-2xl border border-divider">
            {/* RECENT SEARCHES */}
            {recentSearches.length > 0 && !query && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
                    {t("recent_searches")}
                  </span>
                  <button
                    onClick={clearHistory}
                    className="text-[10px] font-black text-primary-main hover:text-primary-dark transition-colors uppercase tracking-widest"
                  >
                    {t("clear_history")}
                  </button>
                </div>
                <div className="space-y-0.5">
                  {recentSearches.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(item, close)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-divider/10 text-sm text-text-primary transition-all group/item"
                    >
                      <svg
                        className="w-4 h-4 text-text-disabled group-hover/item:text-primary-main transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SUGGESTIONS */}
            <div className="p-2 border-t border-divider/40">
              <div className="px-3 py-2">
                <span className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
                  {t("suggestions")}
                </span>
              </div>
              <div className="space-y-0.5">
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(item.text, close)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-divider/10 transition-all flex flex-col gap-0.5"
                  >
                    <div className="text-sm text-text-secondary font-medium">
                      {highlightText(item.text, query)}
                    </div>
                    <div className="text-[10px] text-text-disabled font-medium">
                      — dalam {item.category}
                    </div>
                  </button>
                ))}
                {filteredSuggestions.length === 0 && (
                  <div className="px-3 py-4 text-center">
                    <p className="text-xs text-text-disabled italic">
                      Tidak ada saran yang cocok
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER TIPS */}
            <div className="bg-divider/10 px-4 py-2 border-t border-divider/40">
              <p className="text-[9px] font-bold text-text-disabled uppercase tracking-widest text-center">
                Tekan Enter Untuk Melakukan Pencarian Global
              </p>
            </div>
          </div>
        )}
      </Popover>
    </div>
  );
}

export default Search;
