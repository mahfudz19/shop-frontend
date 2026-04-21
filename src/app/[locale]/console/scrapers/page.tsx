"use client";

import React, { useState } from "react";

export default function ScrapersPage() {
  const [keyword, setKeyword] = useState("");
  const [method, setMethod] = useState("shopee");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  const handleStartScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg({ type: "info", text: "Mengirim perintah ke server..." });

    try {
      // Menembak API FastAPI yang ada di Docker
      const res = await fetch("http://localhost:8000/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          method,
          head_limit: 1, // Memaksa browser menyala agar bisa mengatasi CAPTCHA
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memulai scraper");
      }

      setStatusMsg({
        type: "success",
        text: data.message || `Scraping [${keyword}] dimulai!`,
      });
      setKeyword(""); // Kosongkan input setelah sukses
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err.message || "Gagal terhubung ke API Scraper",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 md:p-6 h-[calc(100vh-4rem)] flex flex-col gap-4">
      {/* HEADER TITTLE */}
      <div className="mb-2">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          Live Scraper Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Jalankan dan pantau proses pengambilan data secara real-time.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 h-full min-h-0">
        {/* ========================================== */}
        {/* KIRI: PANEL KONTROL (1/3 LAYAR)            */}
        {/* ========================================== */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3">
            Konfigurasi Tugas
          </h2>

          <form
            onSubmit={handleStartScrape}
            className="flex flex-col gap-5 mt-2"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                Pilih Target
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all cursor-pointer"
              >
                <option value="shopee">Shopee</option>
                <option value="tokopedia">Tokopedia</option>
                <option value="lazada">Lazada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">
                Kata Kunci (Keyword)
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Misal: sepatu nike original"
                required
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !keyword}
              className="mt-4 w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 disabled:bg-blue-300 transition-all flex justify-center items-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Menghubungi Server...
                </>
              ) : (
                "▶ Mulai Scraping"
              )}
            </button>
          </form>

          {/* AREA NOTIFIKASI */}
          {statusMsg && (
            <div
              className={`mt-2 p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
                statusMsg.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-100"
                  : statusMsg.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          {/* BANTUAN INTERVENSI MANUSIA */}
          <div className="mt-auto pt-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 shadow-inner">
              <div className="flex items-center gap-2 font-bold mb-2 text-yellow-900">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                Human-in-the-Loop (CAPTCHA)
              </div>
              <p className="opacity-90">
                Jika proses terhenti karena verifikasi keamanan (Captcha
                Shopee/Login),{" "}
                <strong>
                  arahkan mouse Anda ke layar hitam di sebelah kanan
                </strong>{" "}
                dan selesaikan secara manual selayaknya browser biasa.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* KANAN: LIVE VIEW BROWSER (2/3 LAYAR)       */}
        {/* ========================================== */}
        <div className="w-full lg:w-2/3 bg-gray-900 rounded-2xl border-4 border-gray-800 shadow-2xl overflow-hidden flex flex-col relative group">
          {/* Mac-like Window Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <span className="ml-3 text-xs font-bold text-gray-400 tracking-widest uppercase">
                SERVER: localhost:6080
              </span>
            </div>
            <a
              href="http://localhost:6080/vnc.html"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 rounded-full transition-colors"
            >
              Buka Layar Penuh ↗
            </a>
          </div>

          {/* IFRAME VNC */}
          <div className="flex-1 bg-black relative">
            {/* Indikator Loading awal sebelum iframe dimuat */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 -z-10">
              <svg
                className="animate-spin h-8 w-8 mb-4 text-gray-600"
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
              <p className="text-sm font-medium">
                Menghubungkan ke Virtual Display...
              </p>
            </div>

            <iframe
              src="http://localhost:6080/vnc.html?autoconnect=true&resize=scale"
              className="w-full h-full border-none"
              title="noVNC Scraper View"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
