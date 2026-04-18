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
    <div className="flex-1">
      {/* TOP BAR: Info & Layout Toggles */}
      <div className="flex items-center justify-between gap-4 mb-6 bg-background-paper p-4 rounded-xl border border-divider shadow-sm">
        <div className="text-xs text-text-secondary leading-relaxed">
          {t("showing_results_for")}{" "}
          <span className="font-bold text-text-primary uppercase overflow-hidden text-ellipsis">
            "
            {searchQuery.length > 25
              ? searchQuery.slice(0, 25) + "..."
              : searchQuery || t("all")}
            "
          </span>
          {meta?.pagination?.total !== undefined && (
            <span className="ml-1 text-text-disabled">
              ({meta.pagination.total} {t("products")})
            </span>
          )}
        </div>

        {/* View Toggles */}
        <div className="flex bg-background-default border border-divider rounded-lg p-1 shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1 rounded-md transition-colors ${viewMode === "grid" ? "bg-background-paper shadow text-primary-main" : "text-text-disabled hover:text-text-secondary"}`}
            title="Grid View"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1 rounded-md transition-colors ${viewMode === "list" ? "bg-background-paper shadow text-primary-main" : "text-text-disabled hover:text-text-secondary"}`}
            title="List View"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {initialProducts?.map((product) => {
          return (
            <Link
              key={product.id}
              href={generateSlug(product.name, product.id)}
              className={`group bg-background-paper border border-divider/50 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-primary-main/30 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden ${
                viewMode === "grid"
                  ? "flex flex-col"
                  : "flex flex-row gap-4 sm:gap-6 items-start sm:items-center"
              }`}
            >
              {/* Visual Badges - Diposisikan mengambang di atas gambar secara spesifik */}
              <div
                className={`absolute z-10 flex flex-col gap-2 ${viewMode === "list" ? "top-6 left-6" : "top-4 left-4"}`}
              >
                {product.discount_percent > 0 && (
                  <span className="bg-error-main text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter shadow-lg shadow-error-main/20">
                    -{product.discount_percent}%
                  </span>
                )}
              </div>

              <span
                className={`absolute z-10 bg-background-default/80 backdrop-blur-md border border-divider/50 text-[9px] font-black text-text-secondary px-2 py-0.5 rounded uppercase font-mono ${viewMode === "list" ? "bottom-6 left-6 top-auto right-auto" : "top-4 right-4"}`}
              >
                {product.marketplace}
              </span>

              {/* Image Section */}
              <div
                className={`bg-background-default rounded-xl flex items-center justify-center overflow-hidden relative group-hover:bg-white transition-colors duration-500 shrink-0 ${
                  viewMode === "grid"
                    ? "h-48 mb-4 w-full"
                    : "h-28 w-28 sm:h-40 sm:w-40"
                }`}
              >
                <Image
                  width={viewMode === "grid" ? 416 : 160}
                  height={viewMode === "grid" ? 208 : 160}
                  {...(product.image_url && process.env.NEXT_IMAGES_HOSTNAME
                    ? {
                        src: `${process.env.NEXT_IMAGES_HOSTNAME}/${product.image_url}`,
                      }
                    : { dummy: true })}
                  alt={product.name}
                  className="max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Info Section - min-w-0 sangat krusial untuk fitur truncate text di flex-1 */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-main animate-pulse shrink-0"></span>
                  <span className="text-[9px] font-bold text-text-disabled uppercase font-mono tracking-widest truncate">
                    {t("sys_live_scan_ok")}
                  </span>
                </div>

                <h3 className="font-bold text-text-primary text-sm line-clamp-2 leading-snug group-hover:text-primary-main transition-colors mb-2 sm:mb-4 min-h-[2.5rem]">
                  {product.name}
                </h3>

                <div className="mt-auto pt-3 sm:pt-4 border-t border-divider/30">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <p className="text-lg sm:text-xl font-black text-text-primary tracking-tighter font-mono">
                      {formatRupiah(product.price_rp)}
                    </p>
                    {product.price_original > product.price_rp && (
                      <span className="text-[10px] text-text-disabled line-through font-mono">
                        {formatRupiah(product.price_original)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Metadata Footer */}
                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-between gap-y-2 text-[9px] font-bold text-text-disabled uppercase tracking-widest pt-3 border-t border-divider/10">
                  <span className="flex items-center gap-1 truncate max-w-[60%]">
                    <span className="shrink-0">📍</span>
                    <span className="truncate">{product.location}</span>
                  </span>
                  <span className="bg-divider/40 px-2 py-0.5 rounded-sm truncate max-w-[40%] text-right">
                    {product.shop}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty & Loading States */}
      {products?.length === 0 && (
        <div className="text-center py-20 bg-background-paper rounded-3xl border border-dashed border-divider">
          <span className="text-4xl block mb-4">📡</span>
          <p className="font-mono text-xs font-bold text-text-secondary uppercase tracking-widest">
            {t("sys_no_data")}
          </p>
        </div>
      )}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-12">
          <div className="flex items-center gap-3 bg-background-paper px-6 py-3 rounded-full border border-divider shadow-sm">
            <div className="w-4 h-4 border-2 border-primary-light border-t-primary-main rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
              {t("sys_syncing")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
