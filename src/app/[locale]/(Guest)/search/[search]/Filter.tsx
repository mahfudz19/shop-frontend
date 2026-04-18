"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Slider from "@/components/ui/Slider";

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
  const t = useTranslations("SearchPage.Filter");

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

  const handleReset = () => {
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
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      min_price: localMinPrice,
      max_price: localMaxPrice,
    });
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-background-paper/60 backdrop-blur-sm border border-divider/50 rounded-2xl p-6 sticky top-24 shadow-sm flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-divider/50 pb-4">
          <h2 className="text-sm font-black text-text-primary uppercase tracking-widest flex items-center gap-2">
            <span className="text-primary-main">⚡</span> {t("title")}
          </h2>
          <button
            onClick={handleReset}
            className="text-[10px] font-bold text-text-secondary hover:text-error-main uppercase tracking-widest transition-colors py-1 px-2 hover:bg-error-light/10 rounded"
          >
            {t("reset")}
          </button>
        </div>

        {/* Harga (Price) Filter */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {t("price")}
          </h3>

          <div className="px-1.5 mb-2">
            <Slider
              value={[
                localMinPrice ? parseInt(localMinPrice, 10) : 0,
                localMaxPrice ? parseInt(localMaxPrice, 10) : 5000000,
              ]}
              min={0}
              max={5000000}
              step={50000}
              color="primary"
              size="small"
              valueLabelDisplay="off"
              onChange={(val) => {
                if (Array.isArray(val)) {
                  setLocalMinPrice(val[0] === 0 ? "" : val[0].toString());
                  setLocalMaxPrice(val[1] === 5000000 ? "" : val[1].toString());
                }
              }}
              onChangeCommitted={(val) => {
                if (Array.isArray(val)) {
                  updateFilters({
                    min_price: val[0] === 0 ? "" : val[0].toString(),
                    max_price: val[1] === 5000000 ? "" : val[1].toString(),
                  });
                }
              }}
            />
            <div className="flex justify-between mt-3 text-[9px] font-bold text-text-disabled uppercase font-mono">
              <span>Rp 0</span>
              <span>Rp 5M+</span>
            </div>
          </div>

          <form className="flex items-center gap-2" onSubmit={handleApplyPrice}>
            <div className="flex items-center bg-background-default border border-divider/50 rounded-lg px-3 py-1.5 flex-1 focus-within:border-primary-main transition-colors">
              <span className="text-[10px] text-text-disabled pr-2">Rp</span>
              <input
                type="number"
                placeholder="Min"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(e.target.value)}
                className="w-full bg-transparent text-xs font-mono font-medium outline-none text-text-primary placeholder:text-text-disabled"
              />
            </div>
            <span className="text-text-disabled font-bold text-xs">-</span>
            <div className="flex items-center bg-background-default border border-divider/50 rounded-lg px-3 py-1.5 flex-1 focus-within:border-primary-main transition-colors">
              <span className="text-[10px] text-text-disabled pr-2">Rp</span>
              <input
                type="number"
                placeholder="Max"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(e.target.value)}
                className="w-full bg-transparent text-xs font-mono font-medium outline-none text-text-primary placeholder:text-text-disabled"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-main/10 text-primary-main hover:bg-primary-main hover:text-white px-2 py-1.5 rounded-lg text-xs transition-colors shrink-0 aspect-square flex items-center justify-center transform active:scale-95"
            >
              <span className="font-bold">→</span>
            </button>
          </form>

          {/* Quick Price Ranges - Chips */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: t("price_under_50k"), min: "", max: "50000" },
              { label: t("price_50k_100k"), min: "50000", max: "100000" },
              { label: t("price_100k_500k"), min: "100000", max: "500000" },
              { label: t("price_above_500k"), min: "500000", max: "" },
            ].map((range, idx) => {
              const isActive = localMinPrice === range.min && localMaxPrice === range.max;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setLocalMinPrice(range.min);
                    setLocalMaxPrice(range.max);
                    updateFilters({ min_price: range.min, max_price: range.max });
                  }}
                  className={`py-1.5 px-2 text-[10px] font-mono font-medium rounded-lg border transition-all text-center
                    ${isActive 
                      ? "bg-primary-main/10 border-primary-main/30 text-primary-main shadow-sm" 
                      : "bg-background-default border-divider/50 text-text-secondary hover:border-text-disabled hover:text-text-primary"
                    }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Marketplace Section*/}
        <div className="space-y-4 pt-6 border-t border-divider/50">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {t("marketplace")}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {["tokopedia", "shopee", "lazada"].map((m) => {
              const active = localMarketplace === m;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    const newVal = active ? "" : m;
                    setLocalMarketplace(newVal);
                    updateFilters({ marketplace: newVal });
                  }}
                  className={`py-2 px-1 text-[10px] font-bold rounded-lg border transition-all uppercase tracking-wider text-center flex flex-col items-center justify-center gap-1
                    ${active 
                      ? "bg-primary-main text-white border-primary-main shadow-md shadow-primary-main/20" 
                      : "bg-background-default border-divider/50 text-text-secondary hover:border-text-disabled hover:text-text-primary"
                    }`}
                >
                  <span className="text-sm opacity-80">{m[0]}</span>
                  <span className="text-[8px]">{m}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rating Filter Chips */}
        <div className="space-y-4 pt-6 border-t border-divider/50">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {t("rating")}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: t("rating_4_up"), val: "4" },
              { label: t("rating_3_up"), val: "3" },
            ].map((r) => {
              const active = localRating === r.val;
              return (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => {
                    const newVal = active ? "" : r.val;
                    setLocalRating(newVal);
                    updateFilters({ rating: newVal });
                  }}
                  className={`py-1.5 px-2 text-[10px] font-bold rounded-lg border transition-all text-center uppercase
                    ${active 
                      ? "bg-warning-main/10 border-warning-main/30 text-warning-main font-black" 
                      : "bg-background-default border-divider/50 text-text-secondary hover:border-text-disabled hover:text-text-primary"
                    }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Filter minimalistic select */}
        <div className="space-y-4 pt-6 border-t border-divider/50">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
            {t("sort")}
          </h3>
          <div className="relative">
            <select
              value={`${localSortBy}-${localSortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split("-");
                setLocalSortBy(sb);
                setLocalSortOrder(so);
                updateFilters({ sort_by: sb, sort_order: so });
              }}
              className="w-full appearance-none bg-background-default border border-divider/50 rounded-lg px-4 py-2 text-xs font-medium text-text-primary outline-none focus:border-primary-main focus:ring-1 focus:ring-primary-main/20 transition-all cursor-pointer"
            >
              <option value="price_rp-asc">{t("sort_price_asc")}</option>
              <option value="price_rp-desc">{t("sort_price_desc")}</option>
              <option value="updatedAt-desc">{t("sort_latest")}</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-disabled text-xs font-bold">
              ⌄
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
