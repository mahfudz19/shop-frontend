"use client";

import { Product } from "@/types/product";
import { MetaDataPagination } from "@/types/respons";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { generateSlug } from "../../product/[id]/page";
import Image from "@/components/Image";

interface ProductListProps {
  initialProducts: Product[];
  initialMeta: MetaDataPagination;
  currentFilters: {
    search: string;
    marketplace: string;
    sort_by: string;
    sort_order: string;
  };
}

export default function ProductList({
  initialProducts,
  initialMeta,
  currentFilters,
}: ProductListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [meta, setMeta] = useState<MetaDataPagination>(initialMeta);
  const [localMarketplace, setLocalMarketplace] = useState(
    currentFilters.marketplace,
  );
  const [localSortBy, setLocalSortBy] = useState(currentFilters.sort_by);
  const [localSortOrder, setLocalSortOrder] = useState(
    currentFilters.sort_order,
  );

  const hasMore = meta?.pagination?.has_next || false;
  const observerTarget = useRef<HTMLDivElement>(null);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateFilters = useCallback(
    (newFilters: Partial<typeof currentFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8">
      {/* --- SIDEBAR FILTER (Control Panel Style) --- */}
      <aside className="w-full lg:w-72 shrink-0 space-y-6">
        <div className="bg-background-paper border border-divider rounded-2xl p-6 sticky top-36 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-divider pb-4">
            <span className="text-primary-main">⚙️</span>
            <h2 className="font-black text-xs uppercase tracking-[0.2em]">
              Engine_Filters
            </h2>
          </div>

          {/* Marketplace Filter */}
          <div className="space-y-4 mb-8">
            <label className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
              Marketplace_Radar
            </label>
            <div className="flex flex-col gap-2">
              {["", "tokopedia", "shopee", "lazada"].map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setLocalMarketplace(m);
                    updateFilters({ marketplace: m });
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex justify-between items-center ${
                    localMarketplace === m
                      ? "bg-primary-main text-primary-contrast shadow-md"
                      : "hover:bg-divider/20 text-text-secondary"
                  }`}
                >
                  <span className="capitalize">{m || "All Markets"}</span>
                  {localMarketplace === m && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-text-disabled uppercase tracking-widest">
              Sort_Optimization
            </label>
            <select
              value={`${localSortBy}-${localSortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split("-");
                setLocalSortBy(sb);
                setLocalSortOrder(so);
                updateFilters({ sort_by: sb, sort_order: so });
              }}
              className="w-full bg-background-default border border-divider rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-primary-main transition-colors"
            >
              <option value="price_rp-asc">Harga: Termurah</option>
              <option value="price_rp-desc">Harga: Tertinggi</option>
              <option value="updatedAt-desc">Data Terbaru</option>
            </select>
          </div>
        </div>
      </aside>

      {/* --- PRODUCT GRID --- */}
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => {
            return (
              <Link
                key={product.id}
                href={generateSlug(product.name, product.id)}
                className="group bg-background-paper border border-divider/50 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-primary-main/30 hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden"
              >
                {/* Visual Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.discount_percent > 0 && (
                    <span className="bg-error-main text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter shadow-lg shadow-error-main/20">
                      -{product.discount_percent}%
                    </span>
                  )}
                </div>

                <span className="absolute top-4 right-4 z-10 bg-background-default/80 backdrop-blur-md border border-divider/50 text-[9px] font-black text-text-secondary px-2 py-0.5 rounded uppercase font-mono">
                  {product.marketplace}
                </span>

                {/* Image Section */}
                <div className="h-48 bg-background-default rounded-xl mb-4 flex items-center justify-center overflow-hidden relative group-hover:bg-white transition-colors duration-500">
                  <Image
                    width={416}
                    height={208}
                    {...(product.image_url && process.env.NEXT_IMAGES_HOSTNAME
                      ? {
                          src: `${process.env.NEXT_IMAGES_HOSTNAME}/${product.image_url}`,
                        }
                      : { dummy: true })}
                    alt={product.name}
                    className="max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-main animate-pulse"></span>
                    <span className="text-[9px] font-bold text-text-disabled uppercase font-mono tracking-widest">
                      Live_Scan_OK
                    </span>
                  </div>

                  <h3 className="font-bold text-text-primary text-sm line-clamp-2 leading-snug group-hover:text-primary-main transition-colors mb-4 min-h-10">
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-divider/30">
                    <div className="flex items-baseline gap-2">
                      <p className="text-xl font-black text-text-primary tracking-tighter font-mono">
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
                  <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-text-disabled uppercase tracking-widest pt-3 border-t border-divider/10">
                    <span className="flex items-center gap-1">
                      📍 {product.location}
                    </span>
                    <span className="bg-divider/40 px-2 py-0.5 rounded-sm">
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
              No_Data_Found_In_Market_Radar
            </p>
          </div>
        )}

        {hasMore && (
          <div ref={observerTarget} className="flex justify-center py-12">
            <div className="flex items-center gap-3 bg-background-paper px-6 py-3 rounded-full border border-divider shadow-sm">
              <div className="w-4 h-4 border-2 border-primary-light border-t-primary-main rounded-full animate-spin"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
                Syncing_More_Data...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
