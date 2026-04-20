"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Ripple from "@/components/ui/Ripple";
import ThemeToggle from "./ThemeToggle";
import LanguegeMenu from "./LanguegeMenu";
import LogoutButton from "../(home)/LogoutButton";
import Drawer from "@/components/ui/Drawer";
import Badge from "@/components/ui/Badge";

interface MobileDrawerProps {
  isLoggedIn: boolean;
}

export default function MobileDrawer({ isLoggedIn }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header.MobileDrawer");

  // Optimized: Use MatchMedia instead of expensive 'resize' event listener
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Trigger Button (Hamburger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-text-secondary hover:text-primary-main hover:bg-primary-main/10 rounded-lg transition-colors md:hidden"
        aria-label="Open Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchor="right"
        className="md:hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-divider/50">
          <span className="text-xs font-black text-text-primary tracking-widest uppercase">
            {t("menu")}
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-text-secondary hover:text-error-main hover:bg-error-main/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-3">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-3 bg-primary-main/5 border border-primary-main/20 rounded-xl hover:bg-primary-main/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Badge badgeContent={3} color="error">
                  <svg
                    className="w-5 h-5 text-primary-main group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </Badge>
                <span className="text-sm font-bold text-text-secondary group-hover:text-primary-main">
                  {t("cart")}
                </span>
              </div>
            </Link>
          </div>

          {/* Settings Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
              {t("settings")}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-secondary">
                {t("theme")}
              </span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-secondary">
                {t("language")}
              </span>
              <LanguegeMenu />
            </div>
          </div>

          <div className="h-px bg-divider/50 w-full" />

          {/* Account Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
              {t("account")}
            </h3>
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-divider/20 rounded-lg text-sm font-bold text-text-secondary hover:text-primary-main hover:bg-primary-main/10 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {t("profile")}
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-divider/20 rounded-lg text-sm font-bold text-text-secondary hover:text-primary-main hover:bg-primary-main/10 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {t("console")}
                </Link>
                <div
                  onClick={() => setIsOpen(false)}
                  className="w-full flex justify-center"
                >
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex items-center p-1 bg-background-default border border-divider rounded-xl shadow-sm">
                {/* Tombol Login - Minimalist with SVG */}
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-text-secondary hover:text-primary-main hover:bg-primary-main/5 transition-all relative overflow-hidden group/login"
                >
                  <Ripple color="primary" />
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover/login:-translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="tracking-widest uppercase">
                    {t("login")}
                  </span>
                </Link>

                {/* Separator Pipe */}
                <div className="h-4 w-px bg-divider mx-1"></div>

                {/* Tombol Sign Up - High Contrast with SVG */}
                <Link
                  href="/register"
                  className="flex items-center gap-2 bg-primary-main text-primary-contrast px-5 py-2 rounded-lg text-xs font-black shadow-lg shadow-primary-main/20 hover:bg-primary-dark hover:-translate-y-0.5 transition-all relative overflow-hidden group/signup"
                >
                  <Ripple />
                  <span className="tracking-widest uppercase">
                    {t("signup")}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 transition-transform group-hover/signup:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
