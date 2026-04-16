"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Promotions } from "@/types/promotions";
import Image from "@/components/Image";

export default function LiveDealCarousel({ promos }: { promos: Promotions[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (promos.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % promos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [promos.length]);

  if (!promos || promos.length === 0) return null;

  const mainPromo = promos[0];
  const otherPromos = promos.slice(1);

  return (
    <div className="w-full max-w-sm bg-background-paper border border-divider shadow-2xl rounded-2xl overflow-hidden flex flex-col relative z-20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)]">
      {/* SYSTEM HEADER - Elegan & Bersih */}
      <div className="px-5 py-3 border-b border-divider flex justify-between items-center bg-divider/25 shrink-0">
        <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
          {activeIndex === 0 ? "⚡ Radar Harga" : "✨ Info Promo"}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-primary-main animate-pulse"></div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {/* SLIDE 0: THE PRICE GAUGE (Modern & Soft) */}
          <div className="w-full shrink-0 p-6 flex flex-col gap-6">
            <div className="flex gap-4 items-start">
              <Image
                src={mainPromo.image_url}
                alt={mainPromo.title}
                width={64}
                height={64}
                containerClassName="w-16 h-16 bg-gray-50 rounded-xl border border-divider p-1 shrink-0 overflow-hidden"
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
              />
              <div>
                <h3 className="font-bold text-text-primary text-sm leading-snug line-clamp-2">
                  {mainPromo.title}
                </h3>
                <p className="text-[11px] text-primary-main font-semibold mt-1 flex items-center gap-1">
                  <span
                    className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent text-primary-main rounded-full"
                    aria-label="loading"
                  ></span>
                  Memindai 3 toko...
                </p>
              </div>
            </div>

            {/* VISUALISASI GAUGE - Tetap ada tapi lebih rapi */}
            <div className="space-y-5">
              <div className="relative pt-2">
                <div className="h-2 w-full bg-divider rounded-full overflow-hidden flex">
                  <div className="h-full bg-error-main/80 w-[30%]"></div>
                  <div className="h-full bg-secondary-main/80 w-[40%]"></div>
                  <div className="h-full bg-success-main w-[30%] relative overflow-hidden">
                    <div className="absolute inset-0 bg-background-paper/20 animate-[shimmer_2s_infinite] -translate-x-full"></div>
                  </div>
                </div>
                {/* Labels on Gauge */}
                <div className="flex justify-between mt-3 text-[10px] font-bold text-text-secondary">
                  <div className="flex flex-col items-start gap-1">
                    <span className="bg-divider px-1.5 py-0.5 rounded">
                      Tokopedia
                    </span>
                    <span className="font-mono text-error-main">Rp 4.6M</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="bg-divider px-1.5 py-0.5 rounded">
                      Lazada
                    </span>
                    <span className="font-mono">Rp 4.6M</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="bg-success-light/20 text-success-main px-1.5 py-0.5 rounded flex items-center gap-1">
                      Shopee{" "}
                      <span className="text-[8px] bg-success-main text-white px-1 rounded-sm">
                        TERMURAH
                      </span>
                    </span>
                    <span className="font-mono text-success-main text-sm font-black">
                      Rp 4.4M
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-success-light/10 border border-success-main/20 rounded-lg p-3">
                <p className="text-[11px] font-semibold text-success-main mb-0.5">
                  Rekomendasi Sistem:
                </p>
                <p className="text-sm font-bold text-success-dark dark:text-success-main leading-tight">
                  Beli di Shopee untuk hemat Rp 200.000 (4.5%)
                </p>
              </div>
            </div>

            <Link
              href={mainPromo.link_url || "/search/promo"}
              className="w-full bg-primary-main text-primary-contrast py-3 rounded-xl text-center font-bold text-sm hover:bg-primary-dark transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Ambil Harga Termurah
            </Link>
          </div>

          {/* SLIDE 1+: PROMO ALERT (Lebih ramah visual) */}
          {otherPromos.map((promo, idx) => (
            <div
              key={promo.id || idx}
              className="w-full shrink-0 p-6 flex flex-col gap-4"
            >
              <div className="w-full h-40 rounded-xl overflow-hidden relative shadow-inner">
                <Image
                  src={promo.image_url}
                  alt={promo.title}
                  width={364}
                  height={160}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="flex-1 mt-2">
                <h3 className="font-bold text-text-primary text-lg leading-snug">
                  {promo.title}
                </h3>
                <p className="text-text-secondary text-sm mt-2 line-clamp-3 leading-relaxed">
                  {promo.description}
                </p>
              </div>

              <Link
                href={promo.link_url || "#"}
                className="mt-4 border-2 border-primary-main text-primary-main py-2.5 rounded-xl text-center font-bold text-sm hover:bg-primary-main hover:text-primary-contrast transition-colors"
              >
                Lihat Detail Promo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
