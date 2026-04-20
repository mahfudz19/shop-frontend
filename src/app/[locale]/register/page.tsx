"use client";

import Ripple from "@/components/ui/Ripple";
import toast from "@/components/ui/Toast";
import { APIError, register } from "@/lib/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Komponen Password Field tetap sama, hanya menambahkan t()
export function PasswordField({
  password,
  setPassword,
  placeholder = "Minimal 6 karakter",
}: {
  password: string;
  setPassword: (password: string) => void;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 bg-background-default border border-divider rounded-lg focus:ring-2 focus:ring-primary-main outline-none text-text-primary"
        placeholder={placeholder}
        minLength={6}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-0 px-4 flex items-center text-text-secondary hover:text-text-primary focus:outline-none"
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3c-4.4 0-8 3.6-8 7s3.6 7 8 7 8-3.6 8-7-3.6-7-8-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3a10.9 10.9 0 00-8 6 10.9 10.9 0 0016 0 10.9 10.9 0 00-8-6zm0 10a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const t = useTranslations("Register"); // Hook terjemahan

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      await register({ name, email, password });
      toast.success(t("title") + " Berhasil!"); // Sesuaikan pesan sukses jika perlu
      router.push("/login");
    } catch (err: any) {
      if (err instanceof APIError) {
        setErrorMsg(err.displayMessage);
      } else {
        setErrorMsg(err.message || "Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background-default">
      {/* ========================================== */}
      {/* KIRI: BAGIAN ILUSTRASI & INFORMASI (50%)   */}
      {/* ========================================== */}
      <div className="hidden lg:flex lg:w-full bg-primary-main relative flex-col justify-center p-12 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 8 0 L 0 0 0 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-primary-contrast max-w-lg mx-auto">
          <h1 className="text-4xl font-black mb-6">{t("title")}</h1>
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("benefit_1_title")}</h3>
                <p className="opacity-75">{t("benefit_1_desc")}</p>
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("benefit_2_title")}</h3>
                <p className="opacity-75">{t("benefit_2_desc")}</p>
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("benefit_3_title")}</h3>
                <p className="opacity-75">{t("benefit_3_desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* KANAN: FORMULIR PENDAFTARAN (50%)          */}
      {/* ========================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              {t("title")}
            </h2>
            <p className="text-text-secondary lg:hidden">{t("subtitle")}</p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-error-main/10 border border-error-main/20 rounded-lg text-error-main text-sm text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6 mt-8">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider">
                {t("label_name")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-background-default border border-divider rounded-lg focus:ring-2 focus:ring-primary-main outline-none text-text-primary transition-all"
                placeholder={t("placeholder_name")}
                required
              />
            </div>

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
            {t("have_account")}{" "}
            <Link
              href="/login"
              className="text-primary-main font-bold hover:underline"
            >
              {t("login_link")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
