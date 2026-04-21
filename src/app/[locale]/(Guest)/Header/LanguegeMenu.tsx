"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import Popover from "@/components/ui/Popover";

export default function LanguageMenu() {
  const [isPending, startTransition] = useTransition();

  const locale = useLocale();
  const t = useTranslations("Header.LanguageMenu");
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "en", label: "ENG", desc: "English" },
    { code: "id", label: "IND", desc: "Indonesia" },
  ];

  const handleLanguageChange = (nextLocale: string, close: () => void) => {
    if (nextLocale === locale) {
      close();
      return;
    }
    close();
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  return (
    <Popover
      position="bottom-right"
      className="w-52 bg-background-paper border border-divider rounded-2xl overflow-hidden mt-2 backdrop-blur-xl"
      lockScroll
      trigger={(isOpen) => (
        <button
          disabled={isPending}
          className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center group ${
            isOpen || isPending
              ? "border-primary-main bg-primary-main/5 text-primary-main shadow-inner"
              : "border-divider bg-background-paper/50 hover:bg-primary-main/5 text-text-secondary hover:text-primary-main hover:shadow-sm"
          }`}
          aria-label="Language Menu"
        >
          <div className="relative">
            <svg
              className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-180" : "group-hover:rotate-12"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-5.965 0-9-7.462-9-9 0-1.538 3.035-9 9-9m0 18c5.965 0 9-7.462 9-9 0-1.538-3.035-9-9-9"
              />
            </svg>
            {/* Locale Indicator Dot */}
            <span className="absolute -top-2.5 -right-2.5 w-4 h-4 bg-background-paper border border-divider rounded-full flex items-center justify-center text-[7px] font-black group-hover:border-primary-main/50 transition-colors">
              {locale.toUpperCase()}
            </span>
          </div>
        </button>
      )}
    >
      {(close) => (
        <div className="py-2 flex flex-col">
          <div className="px-4 py-2 border-b border-divider/50 mb-1">
            <p className="text-xs font-black text-text-primary uppercase tracking-widest">
              {t("select")}
            </p>
          </div>
          <div className="flex flex-col">
            {languages.map((lang) => {
              const isActive = locale === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code, close)}
                  disabled={isPending}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between group ${
                    isActive
                      ? "bg-primary-main/10 text-primary-main font-bold"
                      : "text-text-secondary hover:bg-primary-main/5 hover:text-primary-main"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="tracking-widest capitalize">
                      {lang.desc}
                    </span>
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                      isActive
                        ? "bg-primary-main text-white"
                        : "bg-background-default text-text-disabled group-hover:bg-primary-main/10 group-hover:text-primary-main"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Popover>
  );
}
