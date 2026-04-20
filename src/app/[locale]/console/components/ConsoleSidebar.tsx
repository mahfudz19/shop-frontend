"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import Ripple from "@/components/ui/Ripple";

const navItems = [
  {
    name: "Dashboard",
    href: "/console/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"
        />
      </svg>
    ),
  },
  {
    name: "Scrapers",
    href: "/console/scrapers",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012 2H7a2 2 0 00-2 2v18a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Products",
    href: "/console/products",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    name: "Categories",
    href: "/console/categories",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01M19 7h.01M19 11h.01M19 15h.01M3 3h18v18H3V3z"
        />
      </svg>
    ),
  },
  {
    name: "Orders",
    href: "/console/orders",
    icon: (
      <svg
        className="w-5 h-5"
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
    ),
  },
  {
    name: "Settings",
    href: "/console/settings",
    icon: (
      <svg
        className="w-5 h-5"
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
    ),
  },
];

export default function ConsoleSidebar({
  onItemClick,
}: {
  onItemClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-divider bg-background-paper h-full flex flex-col pt-6 overflow-y-auto">
      {/* Branding */}
      <div className="px-6 mb-8">
        <Link
          href="/"
          onClick={onItemClick}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-primary-main rounded flex items-center justify-center text-white font-black">
            SS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tighter text-text-primary leading-none uppercase">
              ScrapStore
            </span>
            <span className="text-[10px] font-bold text-primary-main tracking-widest uppercase">
              Console
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all overflow-hidden ${
                isActive
                  ? "bg-primary-main text-white shadow-md shadow-primary-main/20"
                  : "text-text-secondary hover:bg-divider/50 hover:text-text-primary"
              }`}
            >
              <Ripple color={isActive ? "white" : "primary"} />
              <span
                className={`${isActive ? "text-white" : "text-text-secondary group-hover:text-primary-main"}`}
              >
                {item.icon}
              </span>
              <span className="uppercase tracking-widest text-[11px]">
                {item.name}
              </span>
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Nav */}
      <div className="p-3 border-t border-divider/50">
        <Link
          href="/"
          onClick={onItemClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-text-disabled hover:text-text-primary hover:bg-divider/50 transition-all group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="uppercase tracking-widest text-[11px]">
            Back to Store
          </span>
        </Link>
      </div>
    </aside>
  );
}
