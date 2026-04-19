"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Terjadi Error:", error);
  }, [error]);

  // Cek apakah error berasal dari fungsi handleResponse kita (punya property status)
  const isApiError = error.name === "APIError" || "status" in error;
  const statusCode = isApiError ? (error as any).status : 500;

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
            {error.message || "Sistem gagal memuat data dari server."}
          </p>
        </div>

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
