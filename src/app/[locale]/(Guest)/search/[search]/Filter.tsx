"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

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
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      <div className="bg-background-paper border border-divider rounded-xl p-5 sticky top-24 shadow-sm">
        <div className="flex items-center justify-between px-6 py-5 border-b border-divider">
          <h2 className="text-xl font-black text-text-primary tracking-tighter uppercase flex items-center gap-2">
            <span className="text-primary-main">⚡</span> {t("title")}
          </h2>
          <button
            onClick={handleReset}
            className="text-[10px] font-bold text-text-secondary hover:text-error-main uppercase tracking-widest transition-colors py-1 px-2 hover:bg-error-light/10 rounded-sm"
          >
            {t("reset")}
          </button>
        </div>

        {/* Harga (Price) Filter */}
        <div className="p-6">
          <h3 className="text-xs font-black text-text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-main"></div>
            {t("price")}
          </h3>
          <form className="flex items-center gap-2 mb-4" onSubmit={handleApplyPrice}>
            <input
              type="number"
              placeholder={t("min_price")}
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              className="w-full bg-background-default border border-divider rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-primary-main focus:bg-background-paper transition-all placeholder:opacity-50"
            />
            <span className="text-text-disabled font-bold">-</span>
            <input
              type="number"
              placeholder={t("max_price")}
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              className="w-full bg-background-default border border-divider rounded-md px-3 py-2 text-xs font-medium outline-none focus:border-primary-main focus:bg-background-paper transition-all placeholder:opacity-50"
            />
            <button
              type="submit"
              className="bg-primary-main/10 text-primary-main hover:bg-primary-main hover:text-white px-3 py-2 border border-primary-light/20 rounded-md text-xs font-black transition-colors"
            >
              {t("go")}
            </button>
          </form>
          {/* Quick Price Ranges */}
          <div className="space-y-2">
            {[
              { label: t("price_under_50k"), min: "", max: "50000" },
              { label: t("price_50k_100k"), min: "50000", max: "100000" },
              { label: t("price_100k_500k"), min: "100000", max: "500000" },
              { label: t("price_above_500k"), min: "500000", max: "" },
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
            {t("marketplace")}
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
          <h3 className="text-sm font-bold text-text-primary mb-3">{t("rating")}</h3>
          <div className="space-y-2">
            {[
              { label: t("rating_4_up"), val: "4" },
              { label: t("rating_3_up"), val: "3" },
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
          <h3 className="text-sm font-bold text-text-primary mb-3">{t("sort")}</h3>
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
            <option value="price_rp-asc">{t("sort_price_asc")}</option>
            <option value="price_rp-desc">{t("sort_price_desc")}</option>
            <option value="updatedAt-desc">{t("sort_latest")}</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
