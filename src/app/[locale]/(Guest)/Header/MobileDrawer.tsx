"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Ripple from "@/components/ui/Ripple";
import ThemeToggle from "./ThemeToggle";
import LanguegeMenu from "./LanguegeMenu";
import LogoutButton from "../(home)/LogoutButton";
import Drawer from "@/components/ui/Drawer";

interface MobileDrawerProps {
  isLoggedIn: boolean;
}

export default function MobileDrawer({ isLoggedIn }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
            Menu
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
          {/* Settings Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
              Settings
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-secondary">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-secondary">Language</span>
              <LanguegeMenu />
            </div>
          </div>

          <div className="h-px bg-divider/50 w-full" />

          {/* Account Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
              Account
            </h3>
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-divider/20 rounded-lg text-sm font-bold text-text-secondary hover:text-primary-main hover:bg-primary-main/10 transition-colors text-center"
                >
                  Dashboard
                </Link>
                <div onClick={() => setIsOpen(false)} className="w-full flex justify-center">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-divider/50 rounded-lg text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-divider/20 transition-colors text-center relative overflow-hidden flex items-center justify-center"
                >
                  <Ripple />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary-main text-primary-contrast px-4 py-2 rounded-lg text-sm font-black shadow-md hover:shadow-lg transition-all text-center relative overflow-hidden flex items-center justify-center"
                >
                  <Ripple />
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
