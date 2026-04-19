"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number; url?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Terjadi Error:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  // ==========================================
  // KUNCI FIX: Ekstrak data JSON dari error.message
  // ==========================================
  let displayMessage = error.message;
  let statusCode = 500;
  let errorUrl = "N/A";

  try {
    // Coba parse jika error dilempar dari Server Component (terenkripsi sbg JSON)
    const parsed = JSON.parse(error.message);
    displayMessage = parsed.message || displayMessage;
    statusCode = parsed.status || 500;
    errorUrl = parsed.url || "N/A";
  } catch (e) {
    // Jika gagal di-parse, berarti ini dari Client Component atau error biasa
    displayMessage = error.message;
    if ("status" in error) statusCode = (error as any).status;
    if ("url" in error) errorUrl = (error as any).url;
  }

  // Tentukan judul berdasarkan status code
  let errorTitle = "Terjadi Kesalahan";
  if (statusCode === 401) errorTitle = "Sesi Berakhir / Tidak Ada Akses";
  if (statusCode === 403) errorTitle = "Akses Ditolak (Bukan Admin)";
  if (statusCode === 404) errorTitle = "Data Tidak Ditemukan";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-default px-4 py-16 font-mono">
      <div className="max-w-md w-full text-center space-y-6 bg-background-paper p-8 rounded-xl border border-divider shadow-sm">
        {/* Indikator Status Code */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-error-main/10 text-error-main mb-2">
          <span className="text-4xl font-black">{statusCode}</span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-text-primary mb-2">
            {errorTitle}
          </h1>
          <p className="text-sm text-text-secondary">
            {displayMessage || "Sistem gagal memuat data dari server."}
          </p>
        </div>

        {/* ========================================== */}
        {/* BLOK DEBUG KHUSUS MODE DEVELOPMENT         */}
        {/* ========================================== */}
        {isDev && (
          <div className="mt-6 p-4 bg-gray-900 rounded-lg text-left text-xs overflow-hidden border border-gray-700">
            <p className="font-bold text-error-light mb-3 pb-2 border-b border-gray-700/50 uppercase tracking-widest">
              🛠 Dev Logs
            </p>
            <div className="space-y-2 text-gray-300 break-all">
              <p>
                <span className="text-gray-500 font-bold w-16 inline-block">
                  STATUS
                </span>
                <span className="text-error-main font-bold">
                  : {statusCode}
                </span>
              </p>
              <p>
                <span className="text-gray-500 font-bold w-16 inline-block">
                  ENDPOINT
                </span>
                <span className="text-primary-light">: {errorUrl}</span>
              </p>
              <p>
                <span className="text-gray-500 font-bold w-16 inline-block">
                  MESSAGE
                </span>
                <span className="text-gray-100">: {displayMessage}</span>
              </p>
            </div>
          </div>
        )}
        {/* ========================================== */}

        <div className="pt-6 flex flex-col gap-3">
          {/* Tombol Coba Lagi */}
          <button
            onClick={() => reset()}
            className="w-full bg-primary-main text-primary-contrast font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Muat Ulang Halaman
          </button>

          {/* Tombol Kembali (Opsional, tergantung status) */}
          {(statusCode === 401 || statusCode === 403) && (
            <Link
              href="/login"
              className="w-full border border-divider text-text-secondary font-bold py-3 rounded-lg hover:text-text-primary hover:border-text-primary transition-colors block"
            >
              Kembali ke Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
