import Link from "next/link";
import React from "react";
import ThemeToggle from "../(Guest)/Header/ThemeToggle";
import LanguageMenu from "../(Guest)/Header/LanguegeMenu";
import { useTranslations } from "next-intl";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Login");

  return (
    <div className="min-h-screen flex bg-background-default relative">
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-xl border border-divider bg-background-paper/50 text-text-secondary"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">
              {t("back")}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <ThemeToggle />
          <LanguageMenu />
        </div>
      </div>

      {children}
    </div>
  );
}
