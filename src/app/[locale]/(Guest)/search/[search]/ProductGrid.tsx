"use client";

import Image from "@/components/Image";
import { Product } from "@/types/product";
import { MetaDataPagination } from "@/types/respons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { formatRupiah, generateSlug } from "../../product/[id]/page";

interface ProductGridProps {
  initialProducts: Product[];
  initialMeta: MetaDataPagination;
  searchQuery: string;
}

const MARKETPLACE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  shopee:    { bg: "bg-[#EE4D2D]/10", text: "text-[#EE4D2D]", dot: "#EE4D2D" },
  tokopedia: { bg: "bg-[#42B549]/10", text: "text-[#42B549]", dot: "#42B549" },
  lazada:    { bg: "bg-[#0F146D]/10", text: "text-[#0F146D]", dot: "#0F146D" },
};

export default function ProductGrid({
  initialProducts,
  initialMeta,
  searchQuery,
}: ProductGridProps) {
  const t = useTranslations("SearchPage.ProductGrid");
  const products = initialProducts;
  const meta = initialMeta;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const hasMore = meta?.pagination?.has_next || false;
  const observerTarget = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 min-w-0">
      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between gap-4 mb-5">
        {/* Result info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-main opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-main" />
            </span>
            <span className="text-[10px] font-black text-success-main uppercase tracking-[0.2em]">
              {t("sys_live_scan_ok")}
            </span>
          </div>
          <div className="w-px h-4 bg-divider" />
          <p className="text-xs text-text-secondary leading-relaxed">
            <span className="font-black text-text-primary">
              &ldquo;
              {searchQuery.length > 25
                ? searchQuery.slice(0, 25) + "..."
                : searchQuery || t("all")}
              &rdquo;
            </span>
            {meta?.pagination?.total !== undefined && (
              <span className="ml-1.5 text-text-disabled font-medium">
                — {meta.pagination.total} {t("products")}
              </span>
            )}
          </p>
        </div>

        {/* View Toggles */}
        <div className="flex bg-background-paper border border-divider rounded-xl p-1 shrink-0 shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-primary-main text-white shadow-sm shadow-primary-main/20"
                : "text-text-disabled hover:text-text-secondary"
            }`}
            title="Grid View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="13" width="8" height="8" rx="2" />
              <rect x="3" y="13" width="8" height="8" rx="2" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-primary-main text-white shadow-sm shadow-primary-main/20"
                : "text-text-disabled hover:text-text-secondary"
            }`}
            title="List View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <circle cx="3" cy="6" r="1" fill="currentColor" stroke="none" />
              <circle cx="3" cy="12" r="1" fill="currentColor" stroke="none" />
              <circle cx="3" cy="18" r="1" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── PRODUCT GRID / LIST ── */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex flex-col gap-3"
        }
      >
        {initialProducts?.map((product) => {
          const mpKey = product.marketplace?.toLowerCase() || "";
          const mpStyle = MARKETPLACE_COLORS[mpKey] || {
            bg: "bg-divider/30",
            text: "text-text-disabled",
            dot: "#9ca3af",
          };

          if (viewMode === "list") {
            return (
              <Link
                key={product.id}
                href={generateSlug(product.name, product.id)}
                className="group flex items-center gap-4 bg-background-paper border border-divider/60 rounded-2xl p-3 hover:border-primary-main/30 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="w-20 h-20 shrink-0 bg-background-default rounded-xl flex items-center justify-center overflow-hidden p-2 border border-divider/40 group-hover:bg-white transition-colors">
                  <Image
                    width={80}
                    height={80}
                    {...(product.image_url && process.env.NEXT_IMAGES_HOSTNAME
                      ? { src: `${process.env.NEXT_IMAGES_HOSTNAME}/${product.image_url}` }
                      : { dummy: true })}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${mpStyle.bg} ${mpStyle.text}`}
                    >
                      {product.marketplace}
                    </span>
                    {product.discount_percent > 0 && (
                      <span className="text-[9px] font-black text-white bg-error-main px-2 py-0.5 rounded-full">
                        -{product.discount_percent}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-text-primary text-sm line-clamp-1 group-hover:text-primary-main transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-text-disabled mt-0.5 truncate">
                    {product.shop} · {product.location}
                  </p>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <p className="text-base font-black text-text-primary tracking-tighter">
                    {formatRupiah(product.price_rp)}
                  </p>
                  {product.price_original > product.price_rp && (
                    <p className="text-[10px] text-text-disabled line-through">
                      {formatRupiah(product.price_original)}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary-main/8 flex items-center justify-center text-primary-main text-sm font-black group-hover:bg-primary-main group-hover:text-white transition-all">
                  →
                </div>
              </Link>
            );
          }

          // ── GRID CARD ──
          return (
            <Link
              key={product.id}
              href={generateSlug(product.name, product.id)}
              className="group bg-background-paper border border-divider/60 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary-main/25 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              {/* Marketplace header strip */}
              <div
                className={`flex items-center justify-between px-3 py-2 border-b border-divider/40 ${mpStyle.bg}`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: mpStyle.dot }}
                  />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${mpStyle.text}`}>
                    {product.marketplace}
                  </span>
                </div>
                {product.discount_percent > 0 && (
                  <span className="text-[8px] font-black text-white bg-error-main px-1.5 py-0.5 rounded-full leading-none">
                    -{product.discount_percent}%
                  </span>
                )}
              </div>

              {/* Image area */}
              <div className="h-36 bg-background-default flex items-center justify-center p-3 overflow-hidden relative">
                <Image
                  width={200}
                  height={144}
                  {...(product.image_url && process.env.NEXT_IMAGES_HOSTNAME
                    ? { src: `${process.env.NEXT_IMAGES_HOSTNAME}/${product.image_url}` }
                    : { dummy: true })}
                  alt={product.name}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-[11px] font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary-main transition-colors mb-auto">
                  {product.name}
                </h3>

                <div className="mt-2 pt-2 border-t border-divider/40">
                  {product.price_original > product.price_rp && (
                    <p className="text-[9px] text-text-disabled line-through leading-none mb-0.5">
                      {formatRupiah(product.price_original)}
                    </p>
                  )}
                  <p className="text-sm font-black text-text-primary tracking-tighter leading-none">
                    {formatRupiah(product.price_rp)}
                  </p>
                  <p className="text-[9px] text-text-disabled mt-1.5 truncate">
                    {product.shop}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── EMPTY STATE ── */}
      {products?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-background-paper rounded-3xl border border-dashed border-divider">
          <div className="w-16 h-16 rounded-2xl bg-primary-main/8 flex items-center justify-center text-3xl mb-4">
            📡
          </div>
          <p className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mb-1">
            {t("sys_no_data")}
          </p>
          <p className="text-xs text-text-disabled mt-1">
            Coba kata kunci yang berbeda atau ubah filter.
          </p>
        </div>
      )}

      {/* ── LOAD MORE ── */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-10">
          <div className="flex items-center gap-3 bg-background-paper px-6 py-3 rounded-full border border-divider shadow-sm">
            <div className="w-3.5 h-3.5 border-2 border-primary-light border-t-primary-main rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
              {t("sys_syncing")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
