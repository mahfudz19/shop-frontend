"use client";

import React from "react";
import { usePathname } from "@/i18n/routing";
import ThemeToggle from "../../(Guest)/Header/ThemeToggle";
import UserMenuDropdown from "../../(Guest)/Header/UserMenuDropdown";

export default function ConsoleHeader({
  userRole,
  onMenuClick,
}: {
  userRole: string;
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();

  // Simple breadcrumb logic
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="h-16 border-b border-divider bg-background-paper/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-text-secondary hover:text-primary-main hover:bg-primary-main/10 rounded-lg transition-colors lg:hidden active:scale-95"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 6h16M4 12h12m-12 6h16"
            />
          </svg>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-text-disabled">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Console
          </span>
          <span className="text-divider">/</span>
        </div>

        <h1 className="text-sm font-black uppercase tracking-widest text-text-primary capitalize truncate max-w-[150px] sm:max-w-none">
          {paths[paths.length - 1] || "Dashboard"}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="h-6 w-px bg-divider mx-1" />

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-black text-text-primary uppercase tracking-tighter">
              Super Admin
            </span>
            <span className="text-[9px] font-bold text-primary-main uppercase tracking-widest">
              {userRole}
            </span>
          </div>
          <UserMenuDropdown userRole={userRole} />
        </div>
      </div>
    </header>
  );
}
