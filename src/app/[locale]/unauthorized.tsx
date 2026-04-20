"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Unauthorized() {
  const t = useTranslations("Unauthorized");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-default px-4">
      <div className="max-w-md w-full text-center space-y-8 bg-background-paper p-12 rounded-2xl border border-divider shadow-2xl relative overflow-hidden group">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-error-main/5 rounded-full blur-3xl group-hover:bg-error-main/10 transition-colors duration-500" />

        {/* 401 Illustration / Icon */}
        <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-background-default border border-divider shadow-inner mb-4 transform group-hover:-rotate-3 transition-transform duration-500">
          <span className="text-6xl font-black text-error-main tracking-tighter">
            401
          </span>
        </div>

        <div className="space-y-3 relative">
          <h1 className="text-2xl font-black text-text-primary uppercase tracking-[0.2em]">
            {t("title") || "UNAUTHORIZED ACCESS"}
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t("description") ||
              "Your authentication token is invalid or has expired. Please re-authenticate to regain access to the system nodes."}
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3 relative">
          <Link
            href="/login"
            className="w-full bg-primary-main text-white font-black py-4 rounded-xl hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary-main/20 hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-xs"
          >
            {t("login_cta") || "Login to System"}
          </Link>

          <Link
            href="/"
            className="w-full border border-divider text-text-secondary font-bold py-3.5 rounded-xl hover:text-text-primary hover:border-text-primary transition-all duration-300 text-xs uppercase tracking-widest bg-background-default/50 block"
          >
            {t("back_home") || "Return to Dashboard"}
          </Link>
        </div>

        {/* System ID Footer */}
        <div className="pt-6 border-t border-divider/50">
          <p className="text-[10px] font-mono text-text-disabled uppercase tracking-widest">
            Security Protocol: 0x401_ERR_UNAUTHORIZED
          </p>
        </div>
      </div>
    </div>
  );
}
