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

export default function ProductList({ initialProducts, initialMeta, currentFilters }: ProductListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. STATE UNTUK DATA
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [meta, setMeta] = useState<MetaData>(initialMeta);

  // PENTING: Jika initialProducts berubah karena SSR (user ganti filter), reset state data!
  useEffect(() => {
    setProducts(initialProducts || []);
    setMeta(initialMeta);
  }, [initialProducts, initialMeta]);

  // 2. STATE UNTUK INPUT FORM LOKAL (Belum di-apply)
  const [localSearch, setLocalSearch] = useState(currentFilters.search);
  const [localMarketplace, setLocalMarketplace] = useState(currentFilters.marketplace);
  const [localSortBy, setLocalSortBy] = useState(currentFilters.sort_by);
  const [localSortOrder, setLocalSortOrder] = useState(currentFilters.sort_order);

  // 3. STATE UNTUK INFINITE SCROLL
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const hasMore = meta?.pagination?.has_next || false;  
  const observerTarget = useRef<HTMLDivElement>(null);

  // --- FUNGSI 1: APPLY FILTER (MEMICU SSR) ---
  const applyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (localSearch) params.set("search", localSearch); 
    else params.delete("search");
    
    if (localMarketplace) params.set("marketplace", localMarketplace); 
    else params.delete("marketplace");
    
    params.set("sort_by", localSortBy);
    params.set("sort_order", localSortOrder);

    // Mendorong URL baru. Ini akan memaksa page.tsx melakukan SSR ulang.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // --- FUNGSI 2: LOAD MORE (CSR MURNI) ---
  const loadMoreProducts = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = meta?.pagination?.page + 1;
      // Fetch berdasarkan URL saat ini, tapi halamannya bertambah
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
      console.error("Gagal memuat lebih banyak produk:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [meta.pagination?.page, hasMore, isLoadingMore, currentFilters]);

  // --- INTERSECTION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
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
    <div className="flex flex-col gap-6">
      {/* HEADER & FILTER BAR (Mengubah Local State) */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cari Produk</label>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilter()}
            placeholder="Ketik nama produk..."
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marketplace</label>
          <select 
            value={localMarketplace} 
            onChange={(e) => setLocalMarketplace(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Semua</option>
            <option value="Shopee">Shopee</option>
            <option value="Tokopedia">Tokopedia</option>
            <option value="Lazada">Lazada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Urutkan</label>
          <select 
            value={`${localSortBy}|${localSortOrder}`} 
            onChange={(e) => {
              const [valSortBy, valSortOrder] = e.target.value.split('|');
              setLocalSortBy(valSortBy);
              setLocalSortOrder(valSortOrder);
            }}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="createdAt|-1">Terbaru</option>
            <option value="price_rp|1">Harga Termurah</option>
            <option value="price_rp|-1">Harga Termahal</option>
          </select>
        </div>

        <button 
          onClick={applyFilter}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Terapkan
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <a 
            key={`${index}-${product.id}-${product.url}`} 
            href={product.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  product.marketplace === 'Shopee' ? 'bg-orange-100 text-orange-600' :
                  product.marketplace === 'Tokopedia' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {product.marketplace}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(product.updatedAt).toLocaleDateString('id-ID')}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-gray-900 mt-auto">
                {formatRupiah(product.price_rp)}
              </p>
              <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
                <span className="flex items-center gap-1">📍 {product.location}</span>
                <span className="flex items-center gap-1">🏪 {product.shop}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">Produk tidak ditemukan.</div>
      )}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {isLoadingMore ? (
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          ) : (
            <span className="text-transparent">Load trigger</span>
          )}
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          Semua produk telah ditampilkan. ({meta?.pagination?.total} produk)
        </div>
      )}
    </div>
  );
}