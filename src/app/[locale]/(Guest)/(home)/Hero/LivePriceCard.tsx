"use client";

import { useState, useEffect } from "react";
import Image from "@/components/Image";

// Static demo data — replace with real API data when available
const DEMO_PRODUCTS = [
  {
    name: "iPhone 16 Pro 256GB",
    image:
      "https://images.unsplash.com/photo-1696446702183-cbd29b24a13d?w=200&h=200&fit=crop",
    prices: {
      shopee: { price: 18900000, label: "Shopee", color: "#EE4D2D" },
      tokopedia: { price: 19200000, label: "Tokopedia", color: "#42B549" },
      lazada: { price: 19500000, label: "Lazada", color: "#0F146D" },
    },
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    image:
      "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=200&h=200&fit=crop",
    prices: {
      shopee: { price: 21500000, label: "Shopee", color: "#EE4D2D" },
      tokopedia: { price: 20800000, label: "Tokopedia", color: "#42B549" },
      lazada: { price: 22000000, label: "Lazada", color: "#0F146D" },
    },
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    prices: {
      shopee: { price: 4100000, label: "Shopee", color: "#EE4D2D" },
      tokopedia: { price: 4250000, label: "Tokopedia", color: "#42B549" },
      lazada: { price: 3950000, label: "Lazada", color: "#0F146D" },
    },
  },
];

const formatRupiah = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

export default function LivePriceCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % DEMO_PRODUCTS.length);
        setAnimating(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const product = DEMO_PRODUCTS[activeIdx];
  const priceList = Object.values(product.prices).sort(
    (a, b) => a.price - b.price,
  );
  const cheapestPrice = priceList[0].price;
  const savings = priceList[priceList.length - 1].price - cheapestPrice;

  return (
    <div className="w-full max-w-[380px] bg-background-paper border border-divider rounded-3xl shadow-2xl overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-primary-main/5 border-b border-divider/50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-main opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success-main" />
          </span>
          <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em]">
            LIVE PRICE SCAN
          </span>
        </div>
        <div className="flex gap-1">
          {DEMO_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-5 bg-primary-main"
                  : "w-1.5 bg-divider hover:bg-text-disabled"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product */}
      <div
        className={`p-5 transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-background-default border border-divider overflow-hidden shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-black text-text-primary leading-tight line-clamp-2">
              {product.name}
            </p>
            <p className="text-[10px] text-text-disabled mt-1 font-medium">
              Perbandingan harga real-time
            </p>
          </div>
        </div>

        {/* Price comparison rows */}
        <div className="space-y-2.5">
          {priceList.map((mp, idx) => {
            const isCheapest = mp.price === cheapestPrice;
            return (
              <div
                key={mp.label}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
                  isCheapest
                    ? "bg-success-main/8 border-success-main/30"
                    : "bg-background-default border-divider/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Marketplace color pill */}
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: mp.color }}
                  />
                  <span
                    className={`text-xs font-black uppercase tracking-wide ${isCheapest ? "text-text-primary" : "text-text-secondary"}`}
                  >
                    {mp.label}
                  </span>
                  {isCheapest && (
                    <span className="text-[9px] font-black text-white bg-success-main px-1.5 py-0.5 rounded-full uppercase tracking-tight">
                      TERMURAH
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm font-black font-mono ${isCheapest ? "text-success-main" : "text-text-disabled"}`}
                >
                  {formatRupiah(mp.price)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Savings summary */}
        {savings > 0 && (
          <div className="mt-4 flex items-center justify-between p-3 bg-primary-main/5 rounded-2xl border border-primary-main/15">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
              Potensi Hemat:
            </span>
            <span className="text-sm font-black text-primary-main">
              {formatRupiah(savings)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
