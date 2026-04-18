"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface FilterProps {
  currentFilters: {
    search: string;
    marketplace: string;
    min_price: string;
    max_price: string;
    rating: string;
    sort_by: string;
    sort_order: string;
  };
}

export default function Filter({ currentFilters }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localMarketplace, setLocalMarketplace] = useState(
    currentFilters.marketplace,
  );
  const [localMinPrice, setLocalMinPrice] = useState(
    currentFilters.min_price || "",
  );
  const [localMaxPrice, setLocalMaxPrice] = useState(
    currentFilters.max_price || "",
  );
  const [localRating, setLocalRating] = useState(currentFilters.rating || "");
  const [localSortBy, setLocalSortBy] = useState(currentFilters.sort_by);
  const [localSortOrder, setLocalSortOrder] = useState(
    currentFilters.sort_order,
  );

  const updateFilters = useCallback(
    (newFilters: Partial<typeof currentFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      <div className="bg-background-paper border border-divider rounded-xl p-5 sticky top-24 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-divider pb-3">
          <h2 className="font-bold text-sm text-text-primary">Filter</h2>
          <button
            onClick={() => {
              setLocalMarketplace("");
              setLocalMinPrice("");
              setLocalMaxPrice("");
              setLocalRating("");
              updateFilters({
                marketplace: "",
                min_price: "",
                max_price: "",
                rating: "",
              });
            }}
            className="text-xs text-primary-main hover:underline"
          >
            Reset
          </button>
        </div>

        {/* Harga (Price) Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-text-primary mb-3">Harga</h3>
          <div className="flex items-center gap-2 mb-3">
            <input
              type="number"
              placeholder="Min Rp"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              className="w-full bg-background-default border border-divider rounded flex-1 px-3 py-1.5 text-xs outline-none focus:border-primary-main"
            />
            <span className="text-text-disabled">-</span>
            <input
              type="number"
              placeholder="Max Rp"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              className="w-full bg-background-default border border-divider rounded flex-1 px-3 py-1.5 text-xs outline-none focus:border-primary-main"
            />
            <button
              onClick={() =>
                updateFilters({
                  min_price: localMinPrice,
                  max_price: localMaxPrice,
                })
              }
              className="bg-primary-main text-white px-3 py-1.5 rounded text-xs font-bold hover:opacity-90"
            >
              Go
            </button>
          </div>
          {/* Quick Price Ranges */}
          <div className="space-y-2">
            {[
              { label: "< Rp 50.000", min: "", max: "50000" },
              { label: "Rp 50rb - 100rb", min: "50000", max: "100000" },
              { label: "Rp 100rb - 500rb", min: "100000", max: "500000" },
              { label: "> Rp 500.000", min: "500000", max: "" },
            ].map((range, idx) => {
              const isActive =
                localMinPrice === range.min && localMaxPrice === range.max;
              return (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${isActive ? "bg-primary-main border-primary-main" : "border-divider group-hover:border-primary-main"}`}
                  >
                    {isActive && (
                      <span className="text-white text-[10px]">✓</span>
                    )}
                  </div>
                  <span
                    className="text-xs text-text-secondary group-hover:text-primary-main transition-colors"
                    onClick={() => {
                      setLocalMinPrice(range.min);
                      setLocalMaxPrice(range.max);
                      updateFilters({
                        min_price: range.min,
                        max_price: range.max,
                      });
                    }}
                  >
                    {range.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Marketplace Filter */}
        <div className="mb-6 pt-4 border-t border-divider/50">
          <h3 className="text-sm font-bold text-text-primary mb-3">
            Toko / Marketplace
          </h3>
          <div className="space-y-2">
            {["tokopedia", "shopee", "lazada"].map((m) => {
              const active = localMarketplace === m;
              return (
                <label
                  key={m}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${active ? "bg-primary-main border-primary-main" : "border-divider group-hover:border-primary-main"}`}
                    onClick={() => {
                      const newVal = active ? "" : m;
                      setLocalMarketplace(newVal);
                      updateFilters({ marketplace: newVal });
                    }}
                  >
                    {active && (
                      <span className="text-white text-[10px]">✓</span>
                    )}
                  </div>
                  <span
                    className="text-xs text-text-secondary capitalize group-hover:text-primary-main transition-colors"
                    onClick={() => {
                      const newVal = active ? "" : m;
                      setLocalMarketplace(newVal);
                      updateFilters({ marketplace: newVal });
                    }}
                  >
                    {m}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6 pt-4 border-t border-divider/50">
          <h3 className="text-sm font-bold text-text-primary mb-3">Rating</h3>
          <div className="space-y-2">
            {[
              { label: "⭐ 4 Ke atas", val: "4" },
              { label: "⭐ 3 Ke atas", val: "3" },
            ].map((r) => {
              const active = localRating === r.val;
              return (
                <label
                  key={r.val}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${active ? "bg-primary-main border-primary-main" : "border-divider group-hover:border-primary-main"}`}
                    onClick={() => {
                      const newVal = active ? "" : r.val;
                      setLocalRating(newVal);
                      updateFilters({ rating: newVal });
                    }}
                  >
                    {active && (
                      <span className="text-white text-[10px]">✓</span>
                    )}
                  </div>
                  <span
                    className="text-xs text-text-secondary group-hover:text-primary-main transition-colors"
                    onClick={() => {
                      const newVal = active ? "" : r.val;
                      setLocalRating(newVal);
                      updateFilters({ rating: newVal });
                    }}
                  >
                    {r.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="pt-4 border-t border-divider/50">
          <h3 className="text-sm font-bold text-text-primary mb-3">Urutkan</h3>
          <select
            value={`${localSortBy}-${localSortOrder}`}
            onChange={(e) => {
              const [sb, so] = e.target.value.split("-");
              setLocalSortBy(sb);
              setLocalSortOrder(so);
              updateFilters({ sort_by: sb, sort_order: so });
            }}
            className="w-full bg-background-default border border-divider rounded px-3 py-2 text-xs outline-none focus:border-primary-main transition-colors"
          >
            <option value="price_rp-asc">Harga: Termurah</option>
            <option value="price_rp-desc">Harga: Tertinggi</option>
            <option value="updatedAt-desc">Data Terbaru</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
