"use client";

import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { login, toastError } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import PasswordField from "../register/PasswordField";

function QuickAccess({
  emailRef,
  passwordRef,
}: {
  emailRef: React.RefObject<HTMLInputElement | null>;
  passwordRef: React.RefObject<HTMLInputElement | null>;
}) {
  const t = useTranslations("Login");
  // Data akun dari gambar untuk testing
  const testAccounts = [
    {
      email: "user@example.com",
      role: "User",
      name: "user",
      id: "69e4b3fb8af52f790912376f",
    },
    {
      email: "admin@example.com",
      role: "Admin",
      name: "John Doe",
      id: "69e4b4d9f060e423051d8c8c",
    },
  ];

  const handleQuickFill = (email: string) => {
    if (emailRef.current) emailRef.current.value = email;
    if (passwordRef.current) passwordRef.current.value = "password123";
    toast.success(t("quick_fill_success", { email }));
  };

  return (
    <div className="pt-8 border-t border-divider/60">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-[1px] flex-1 bg-divider/40" />
        <span className="text-[9px] font-black text-text-disabled uppercase tracking-[0.3em]">
          {t("quick_access_label")}
        </span>
        <div className="h-[1px] flex-1 bg-divider/40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {testAccounts.map((acc) => (
          <button
            key={acc.email}
            type="button"
            onClick={() => handleQuickFill(acc.email)}
            className="flex flex-col gap-1.5 p-4 rounded-2xl border border-divider/60 bg-background-paper hover:bg-divider/5 hover:border-primary-main/40 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-main animate-pulse" />
            </div>
            <span className="text-[8px] font-black text-primary-main uppercase tracking-widest bg-primary-main/10 w-fit px-1.5 py-0.5 rounded">
              {acc.role === "Admin" ? t("role_admin") : t("role_user")}
            </span>
            <div className="mt-1">
              <p className="text-xs font-black text-text-primary group-hover:text-primary-main transition-colors truncate uppercase tracking-tighter">
                {acc.name}
              </p>
              <p className="text-[10px] text-text-disabled truncate font-medium">
                {acc.email}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FormLogin() {
  const router = useRouter();
  const t = useTranslations("Login");

  const [isLoading, setIsLoading] = useState(false);

  // Menggunakan useRef daripada useState untuk menghindari re-render di setiap keystroke (lebih ringan)
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      await login(email, password);
      toast.success(t("title") + "!");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      toastError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] ml-1"
          >
            {t("label_email")}
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            autoComplete="email"
            className="w-full p-4 bg-background-paper border border-divider rounded-xl focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all font-medium placeholder:text-text-disabled/30"
            placeholder={t("placeholder_email")}
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] ml-1"
          >
            {t("label_password")}
          </label>
          <PasswordField
            id="password"
            ref={passwordRef}
            placeholder={t("placeholder_password")}
            className="w-full p-4 bg-background-paper border border-divider rounded-xl focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all font-medium placeholder:text-text-disabled/30"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full bg-primary-main text-primary-contrast font-black py-4 rounded-xl hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden group shadow-lg shadow-primary-main/20"
        >
          <Ripple />
          <span className="relative z-10 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em]">
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            )}
            {isLoading ? t("btn_loading") : t("btn_submit")}
          </span>
        </button>
      </form>

      {/* QUICK LOGIN ACCESS */}
      {process.env.NEXT_PUBLIC_SHOW_QUICK_LOGIN === "true" && (
        <QuickAccess emailRef={emailRef} passwordRef={passwordRef} />
      )}
    </>
  );
}
