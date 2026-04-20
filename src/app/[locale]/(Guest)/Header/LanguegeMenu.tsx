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

  // Daftar bahasa yang didukung
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
      className="w-36 bg-background-paper border border-divider rounded-sm overflow-hidden"
      trigger={(isOpen) => (
        <button
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
      )}
    >
      {(close) => (
        <>
          <div className="px-3 py-2 border-b border-divider/50 bg-background-paper">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-text-disabled">
              {t("select")}
            </span>
          </div>
          <ul className="flex flex-col p-1">
            {languages.map((lang) => {
              const isActive = locale === lang.code;
              return (
                <li key={lang.code}>
                  <button
                    onClick={() => handleLanguageChange(lang.code, close)}
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
        </>
      )}
    </Popover>
  );
}
