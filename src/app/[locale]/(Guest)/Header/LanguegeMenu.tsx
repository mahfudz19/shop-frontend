"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LanguageMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Daftar bahasa yang didukung
  const languages = [
    { code: "en", label: "ENG", desc: "English" },
    { code: "id", label: "IND", desc: "Indonesia" },
  ];

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    setIsOpen(false);

    // Gunakan startTransition agar Next.js 16 tidak memblokir UI saat memuat halaman bahasa baru
    startTransition(() => {
      // router.replace akan mengubah bahasa, tetapi tetap di halaman (pathname) yang sama
      router.replace(pathname, { locale: nextLocale });
    });
  };

  // Menutup dropdown jika user mengklik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative font-mono" ref={menuRef}>
      {/* Tombol Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold border rounded-sm transition-all duration-300 ${
          isOpen || isPending
            ? "border-primary-main text-primary-main bg-primary-main/10"
            : "border-divider text-text-secondary hover:border-text-primary hover:text-text-primary"
        }`}
      >
        <span className="text-sm">🌐</span>
        <span className="uppercase tracking-widest">
          [{locale.toUpperCase()}]
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-background-paper border border-divider shadow-lg rounded-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-divider/50 bg-background-default/50">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-disabled">
              Select_Locale
            </span>
          </div>
          <ul className="flex flex-col p-1">
            {languages.map((lang) => {
              const isActive = locale === lang.code;
              return (
                <li key={lang.code}>
                  <button
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={isPending}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors rounded-sm ${
                      isActive
                        ? "bg-primary-main/10 text-primary-main font-bold"
                        : "text-text-secondary hover:bg-divider/50 hover:text-text-primary"
                    }`}
                  >
                    <span className="tracking-widest">{lang.label}</span>
                    <span className="text-[9px] opacity-70">{lang.desc}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
