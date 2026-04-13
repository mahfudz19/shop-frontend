"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Product, MetaData } from "@/types/product";
import { fetchProducts } from "@/lib/api";

interface ProductListProps {
  initialProducts: Product[];
  initialMeta: MetaData;
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
  const [meta, setMeta] = useState<MetaData>(initialMeta);

  useEffect(() => {
    setProducts(initialProducts || []);
    setMeta(initialMeta);
  }, [initialProducts, initialMeta]);

  const [localMarketplace, setLocalMarketplace] = useState(
    currentFilters.marketplace,
  );
  const [localSortBy, setLocalSortBy] = useState(currentFilters.sort_by);
  const [localSortOrder, setLocalSortOrder] = useState(
    currentFilters.sort_order,
  );

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const hasMore = meta?.pagination?.has_next || false;
  const observerTarget = useRef<HTMLDivElement>(null);

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (localMarketplace) params.set("marketplace", localMarketplace);
    else params.delete("marketplace");

    params.set("sort_by", localSortBy);
    params.set("sort_order", localSortOrder);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = meta.pagination.page + 1;
      const response = await fetchProducts({
        search: currentFilters.search,
        marketplace: currentFilters.marketplace,
        sort_by: currentFilters.sort_by,
        sort_order: currentFilters.sort_order,
        page: nextPage,
        limit: 12,
      });

      setProducts((prev) => [...prev, ...(response.data || [])]);
      setMeta(response.meta);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [meta?.pagination?.page, hasMore, isLoadingMore, currentFilters]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMoreProducts, hasMore, isLoadingMore]);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8">
      {/* LEFT SIDEBAR: FILTERS & MINI FOOTER */}
      <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
        {/* Box Filter */}
        <div className="bg-background-paper p-6 rounded-md border border-divider sticky top-20 shadow-sm">
          <h3 className="font-black text-lg text-text-primary mb-4 border-b border-divider pb-2">
            Filters
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-bold text-text-primary mb-2">
              Marketplace
            </label>
            <div className="space-y-2">
              {["", "Shopee", "Tokopedia", "Lazada"].map((mp) => (
                <label
                  key={mp}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="marketplace"
                    value={mp}
                    checked={localMarketplace === mp}
                    onChange={(e) => setLocalMarketplace(e.target.value)}
                    className="text-secondary-main focus:ring-secondary-main"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-secondary-main transition-colors">
                    {mp || "All Marketplaces"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilter}
            className="w-full bg-secondary-main text-secondary-contrast font-bold py-3 rounded-sm hover:bg-secondary-dark transition shadow-sm"
          >
            Apply Filters
          </button>
        </div>

        {/* SIDEBAR FOOTER (Sticky) */}
        <div className="sticky top-100 text-xs text-text-secondary px-2 flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-medium">
            <a href="#" className="hover:text-text-primary transition">
              About Us
            </a>
            <a href="#" className="hover:text-text-primary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-text-primary transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-text-primary transition">
              Help Center
            </a>
          </div>
          <p className="mt-2 text-text-disabled">
            © 2026 {process.env.NEXT_PUBLIC_APP_NAME} Inc. All rights reserved.
          </p>
        </div>
      </aside>

      {/* RIGHT CONTENT: PRODUCT GRID */}
      <div className="flex-1">
        {/* Top Bar: Title & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-background-paper p-4 rounded-md border border-divider shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-text-primary">
              Search Results
            </h1>
            <p className="text-sm text-text-secondary">
              {meta?.pagination?.total || 0} products found
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <label className="text-sm font-bold text-text-primary whitespace-nowrap">
              Sort By:
            </label>
            <select
              value={`${localSortBy}|${localSortOrder}`}
              onChange={(e) => {
                const [valSortBy, valSortOrder] = e.target.value.split("|");
                setLocalSortBy(valSortBy);
                setLocalSortOrder(valSortOrder);
                setTimeout(applyFilter, 100);
              }}
              className="p-2 border border-divider rounded-sm text-sm outline-none focus:border-secondary-main bg-background-default text-text-primary"
            >
              <option value="createdAt|-1">Newest</option>
              <option value="price_rp|1">Lowest Price</option>
              <option value="price_rp|-1">Highest Price</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products?.map((product) => (
            <a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background-paper rounded-md border border-divider overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center h-full relative"
            >
              {/* Promo Badge */}
              <div className="absolute top-3 left-3 bg-error-main text-error-contrast text-[10px] font-black px-2 py-1 rounded-sm z-10 uppercase tracking-wider shadow-sm">
                Deal
              </div>

              <div className="p-5 flex-1 flex flex-col w-full">
                <div className="flex justify-between items-start mb-3 pl-10">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-sm shadow-sm ${
                      product.marketplace === "Shopee"
                        ? "bg-secondary-main text-secondary-contrast"
                        : product.marketplace === "Tokopedia"
                          ? "bg-success-main text-success-contrast"
                          : "bg-primary-main text-primary-contrast"
                    }`}
                  >
                    {product.marketplace}
                  </span>
                </div>

                <h3 className="font-bold text-text-primary line-clamp-2 mb-4 group-hover:text-primary-main leading-snug transition-colors">
                  {product.name}
                </h3>

                <div className="mt-auto">
                  <p className="text-2xl font-black text-error-main mb-3">
                    {formatRupiah(product.price_rp)}
                  </p>
                  <div className="flex flex-col gap-1.5 pt-3 border-t border-divider text-xs font-medium text-text-secondary">
                    <span className="flex items-center gap-2">
                      <span>📍</span> {product.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <span>🏪</span> {product.shop}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="text-center py-20 text-text-secondary bg-background-paper rounded-md border border-divider mt-6 shadow-sm">
            <span className="text-4xl block mb-3">🔍</span>
            No products found matching your criteria.
          </div>
        )}

        {/* Infinite Scroll Loader */}
        {hasMore && (
          <div ref={observerTarget} className="flex justify-center py-10">
            {isLoadingMore ? (
              <div className="w-10 h-10 border-4 border-secondary-light border-t-secondary-main rounded-full animate-spin"></div>
            ) : (
              <span className="text-transparent">Load trigger</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
