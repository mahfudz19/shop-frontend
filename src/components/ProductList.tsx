"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Product, PaginationMeta } from "@/types/product";
import { fetchProducts } from "@/lib/api";

interface ProductListProps {
  initialProducts: Product[];
  initialMeta: PaginationMeta;
}

export default function ProductList({ initialProducts, initialMeta }: ProductListProps) {
  // State untuk Data
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  
  // State untuk Infinite Scroll
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMeta.current_page < initialMeta.total_pages);
  
  // State untuk Filter & Pencarian
  const [search, setSearch] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("-1");

  // Ref untuk mendeteksi kapan user men-scroll ke paling bawah
  const observerTarget = useRef<HTMLDivElement>(null);

  // --- FUNGSI LOAD MORE (INFINITE SCROLL) ---
  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = meta.current_page + 1;
      const response = await fetchProducts({
        search,
        marketplace,
        sort_by: sortBy,
        sort_order: sortOrder,
        page: nextPage,
        limit: 12, // Ambil 12 item per halaman
      });

      setProducts((prev) => [...prev, ...response.data]);
      setMeta(response.meta);
      setHasMore(response.meta.current_page < response.meta.total_pages);
    } catch (error) {
      console.error("Gagal memuat lebih banyak produk:", error);
    } finally {
      setIsLoading(false);
    }
  }, [meta.current_page, hasMore, isLoading, search, marketplace, sortBy, sortOrder]);

  // --- FUNGSI APPLY FILTER ---
  const applyFilter = async () => {
    setIsLoading(true);
    try {
      const response = await fetchProducts({
        search,
        marketplace,
        sort_by: sortBy,
        sort_order: sortOrder,
        page: 1, // Selalu reset ke halaman 1 jika filter berubah
        limit: 12,
      });

      setProducts(response.data);
      setMeta(response.meta);
      setHasMore(response.meta.current_page < response.meta.total_pages);
    } catch (error) {
      console.error("Gagal menerapkan filter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- INTERSECTION OBSERVER UNTUK INFINITE SCROLL ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Jika elemen target (paling bawah) terlihat di layar, panggil loadMore
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 } // 100% elemen harus terlihat baru trigger
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMoreProducts, hasMore, isLoading]);

  // Utility untuk format Rupiah
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER & FILTER BAR */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cari Produk</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilter()}
            placeholder="Ketik nama produk..."
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marketplace</label>
          <select 
            value={marketplace} 
            onChange={(e) => setMarketplace(e.target.value)}
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
            value={`${sortBy}|${sortOrder}`} 
            onChange={(e) => {
              const [valSortBy, valSortOrder] = e.target.value.split('|');
              setSortBy(valSortBy);
              setSortOrder(valSortOrder);
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
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          Cari
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <a 
            key={product.id} 
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

      {/* INFINITE SCROLL OBSERVER TARGET */}
      {products.length === 0 && !isLoading && (
        <div className="text-center py-12 text-gray-500">Produk tidak ditemukan.</div>
      )}

      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {isLoading ? (
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          ) : (
            <span className="text-transparent">Load trigger</span>
          )}
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          Semua produk telah ditampilkan. ({meta.total_records} produk)
        </div>
      )}
    </div>
  );
}