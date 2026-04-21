"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { logout } from "@/lib/api";
import Popover from "@/components/ui/Popover";
import toast from "@/components/ui/Toast";

interface UserMenuDropdownProps {
  userRole: string;
}

export default function UserMenuDropdown({ userRole }: UserMenuDropdownProps) {
  const router = useRouter();
  const t = useTranslations("HomePage.LogoutButton");
  const tMenu = useTranslations("Header.UserMenuDropdown");

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <Popover
      position="bottom-right"
      className="w-52 bg-background-paper border border-divider rounded-2xl overflow-hidden shadow-2xl shadow-primary-main/10 mt-2 backdrop-blur-xl"
      lockScroll
      trigger={(isOpen) => (
        <button
          className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center group ${
            isOpen
              ? "border-primary-main bg-primary-main/5 text-primary-main shadow-inner"
              : "border-divider bg-background-paper/50 text-text-secondary hover:border-text-primary hover:text-text-primary"
          }`}
          aria-label="User Menu"
        >
          <div className="relative">
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {/* Status Indicator Dot */}
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success-main border-2 border-background-paper rounded-full" />
          </div>
        </button>
      )}
    >
      {(close) => (
        <div className="py-2 flex flex-col">
          <div className="px-4 py-2 border-b border-divider/50 mb-1">
            <p className="text-xs font-black text-text-primary uppercase tracking-widest">
              {tMenu("my_account")}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={close}
            className="px-4 py-2 text-sm text-text-secondary font-medium hover:bg-primary-main/10 hover:text-primary-main transition-colors flex items-center gap-2"
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
            {tMenu("profile")}
          </Link>

          {userRole === "admin" && (
            <Link
              href="/console/dashboard"
              onClick={close}
              className="px-4 py-2 text-sm text-text-secondary font-medium hover:bg-primary-main/10 hover:text-primary-main transition-colors flex items-center gap-2"
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
              {tMenu("console")}
            </Link>
          )}

          <div className="px-2 mt-1">
            <button
              onClick={() => {
                close();
                handleLogout();
              }}
              className="w-full text-left px-2 py-2 text-sm font-bold text-error-main hover:bg-error-main/10 rounded-md transition-colors flex items-center gap-2 border-t border-divider/40"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </Popover>
  );
}
