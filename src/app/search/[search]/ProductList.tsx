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
        <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-20 shadow-sm">
          <h3 className="font-black text-lg text-gray-900 mb-4 border-b pb-2">
            Filters
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
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
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                    {mp || "All Marketplaces"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilter}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-sm"
          >
            Apply Filters
          </button>
        </div>

        {/* SIDEBAR FOOTER (Sticky) */}
        <div className="sticky top-100 text-xs text-gray-500 px-2 flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-medium">
            <a href="#" className="hover:text-gray-900 transition">
              About Us
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 transition">
              Help Center
            </a>
          </div>
          <p className="mt-2 text-gray-400">
            © 2026 {process.env.NEXT_PUBLIC_APP_NAME} Inc. All rights reserved.
          </p>
        </div>
      </aside>

      {/* RIGHT CONTENT: PRODUCT GRID */}
      <div className="flex-1">
        {/* Top Bar: Title & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-xl border border-gray-200">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Search Results
            </h1>
            <p className="text-sm text-gray-500">
              {meta?.pagination?.total || 0} products found
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <label className="text-sm font-bold text-gray-700 whitespace-nowrap">
              Sort By:
            </label>
            <select
              value={`${localSortBy}|${localSortOrder}`}
              onChange={(e) => {
                const [valSortBy, valSortOrder] = e.target.value.split("|");
                setLocalSortBy(valSortBy);
                setLocalSortOrder(valSortOrder);
                // Langsung apply sort tanpa perlu klik tombol
                setTimeout(applyFilter, 100);
              }}
              className="p-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-orange-500 bg-gray-50"
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
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col items-center h-full relative"
            >
              {/* Promo Badge */}
              <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full z-10 uppercase tracking-wider">
                Deal
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3 pl-10">
                  <span
                    className={`text-xs font-black px-2 py-1 rounded-md ${
                      product.marketplace === "Shopee"
                        ? "bg-orange-100 text-orange-600"
                        : product.marketplace === "Tokopedia"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {product.marketplace}
                  </span>
                </div>

                <h3 className="font-bold text-gray-800 line-clamp-2 mb-4 group-hover:text-blue-600 leading-snug">
                  {product.name}
                </h3>

                <div className="mt-auto">
                  <p className="text-2xl font-black text-gray-900 mb-3">
                    {formatRupiah(product.price_rp)}
                  </p>
                  <div className="flex flex-col gap-1.5 pt-3 border-t border-gray-100 text-xs font-medium text-gray-500">
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

        {/* Infinite Scroll Loaders */}
        {products?.length === 0 && (
          <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200 mt-6">
            <span className="text-4xl block mb-3">🔍</span>
            No products found matching your criteria.
          </div>
        )}

        {hasMore && (
          <div ref={observerTarget} className="flex justify-center py-10">
            {isLoadingMore ? (
              <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            ) : (
              <span className="text-transparent">Load trigger</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
