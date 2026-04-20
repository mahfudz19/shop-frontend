"use client";

import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { login, toastError } from "@/lib/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordField } from "../register/page";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
    <div className="min-h-screen flex bg-background-default">
      {/* ========================================== */}
      {/* KIRI: BAGIAN INFORMASI & BRANDING (50%)     */}
      {/* ========================================== */}
      <div className="hidden lg:flex lg:w- bg-primary-main relative flex-col justify-center p-12 overflow-hidden">
        {/* Dekorasi Grid Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid-login"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-login)" />
          </svg>
        </div>

        <div className="relative z-10 text-primary-contrast max-w-lg mx-auto">
          <h1 className="text-4xl font-black mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-lg opacity-90 mb-12">{t("subtitle")}</p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl rounded-tl-none mt-1">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("feature_1_title")}</h3>
                <p className="opacity-75">{t("feature_1_desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl rounded-tl-none mt-1">
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("feature_2_title")}</h3>
                <p className="opacity-75">{t("feature_2_desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl rounded-tl-none mt-1">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("feature_3_title")}</h3>
                <p className="opacity-75">{t("feature_3_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* KANAN: FORMULIR LOGIN (50%)                */}
      {/* ========================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              {t("title")}
            </h2>
            <p className="text-text-secondary lg:hidden">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider">
                {t("label_email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-background-default border border-divider rounded-lg focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all"
                placeholder={t("placeholder_email")}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider">
                {t("label_password")}
              </label>
              <PasswordField
                password={password}
                setPassword={setPassword}
                placeholder={t("placeholder_password")}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-primary-main text-primary-contrast font-bold py-3.5 rounded-lg hover:bg-primary-dark disabled:bg-primary-light transition-colors overflow-hidden group mt-4"
            >
              <Ripple />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isLoading ? t("btn_loading") : t("btn_submit")}
              </span>
            </button>
          </form>

          <p className="text-center text-text-secondary mt-8">
            {t("no_account")}{" "}
            <Link
              href="/register"
              className="text-primary-main font-bold hover:underline"
            >
              {t("register_link")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
