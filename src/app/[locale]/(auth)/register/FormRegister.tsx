"use client";

import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { register, toastError } from "@/lib/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import PasswordField from "./PasswordField";
import { twMerge } from "tailwind-merge";

function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const router = useRouter();
  const t = useTranslations("Register");

  // Logic Validasi Password
  const securityCheck = useMemo(() => {
    return {
      hasMinChars: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const isPasswordSecure = Object.values(securityCheck).every(Boolean);
  const isMatching = password === confirmPassword && confirmPassword !== "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordSecure) {
      toast.error(t("error_weak_password"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("error_mismatch"));
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password, confirmPassword });
      toast.success(t("title") + " " + t("success_msg"));
      router.push("/login");
    } catch (err: any) {
      toastError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-8">
      {/* Name Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-black text-text-secondary uppercase tracking-[0.2em] ml-1">
          {t("label_name")}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 bg-background-paper border border-divider rounded-xl focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all font-medium placeholder:text-text-disabled/30"
          placeholder={t("placeholder_name")}
          required
        />
      </div>

      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="block text-sm font-black text-text-secondary uppercase tracking-[0.2em] ml-1">
          {t("label_email")}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-background-paper border border-divider rounded-xl focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all font-medium placeholder:text-text-disabled/30"
          placeholder={t("placeholder_email")}
          required
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-black text-text-secondary uppercase tracking-[0.2em] ml-1">
          {t("label_password")}
        </label>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setIsPasswordFocused(true)}
          placeholder={t("placeholder_password")}
          className="w-full p-4 bg-background-paper border border-divider rounded-xl focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all font-medium placeholder:text-text-disabled/30"
          required
        />

        {/* Security Checklist UI */}
        <div
          className={twMerge(
            "grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 p-4 bg-divider/10 border border-divider/40 rounded-2xl transition-all duration-300 transform origin-top",
            isPasswordFocused || password.length > 0
              ? "opacity-100 h-auto scale-y-100"
              : "opacity-0 h-0 scale-y-0 overflow-hidden",
          )}
        >
          <SecurityItem
            label={t("req_min_chars")}
            isMet={securityCheck.hasMinChars}
          />
          <SecurityItem
            label={t("req_uppercase")}
            isMet={securityCheck.hasUppercase}
          />
          <SecurityItem
            label={t("req_number")}
            isMet={securityCheck.hasNumber}
          />
          <SecurityItem
            label={t("req_special")}
            isMet={securityCheck.hasSpecial}
          />
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between ml-1">
          <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {t("label_confirm_password")}
          </label>
          {confirmPassword.length > 0 && (
            <span
              className={twMerge(
                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                isMatching
                  ? "bg-success-main/10 text-success-main"
                  : "bg-error-main/10 text-error-main",
              )}
            >
              {isMatching ? t("status_matched") : t("status_mismatch")}
            </span>
          )}
        </div>
        <PasswordField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t("placeholder_confirm_password")}
          className={twMerge(
            "w-full p-4 bg-background-paper border rounded-xl focus:ring-2 outline-none text-text-primary transition-all font-medium placeholder:text-text-disabled/30",
            confirmPassword.length > 0
              ? isMatching
                ? "border-success-main focus:ring-success-main/20"
                : "border-error-main focus:ring-error-main/20"
              : "border-divider focus:ring-primary-main",
          )}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full bg-primary-main text-primary-contrast font-black py-4 rounded-xl hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden group shadow-lg shadow-primary-main/20 group uppercase tracking-widest text-[11px]"
      >
        <Ripple />
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isLoading && (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          )}
          {isLoading ? t("btn_loading") : t("btn_submit")}
        </span>
      </button>
    </form>
  );
}

function SecurityItem({ label, isMet }: { label: string; isMet: boolean }) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-2 text-[10px] font-black uppercase tracking-tight transition-colors",
        isMet ? "text-success-main" : "text-text-disabled",
      )}
    >
      <div
        className={twMerge(
          "w-4 h-4 rounded-full flex items-center justify-center transition-all",
          isMet
            ? "bg-success-main text-white"
            : "bg-divider text-transparent scale-90",
        )}
      >
        <svg
          className="w-2.5 h-2.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span>{label}</span>
    </div>
  );
}

export default FormRegister;
