import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const initialData = await fetchProducts({
    page: 1,
    limit: 12,
    sort_by: "createdAt",
    sort_order: "-1",
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      {/* NAVBAR SEDERHANA */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600">Scrap</span>
            <span className="text-xl font-bold text-gray-800">Store</span>
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Katalog Produk</h1>
          <p className="text-gray-600">
            Kumpulan data produk hasil ekstraksi dari berbagai marketplace.
          </p>
        </div>

        {/* Kirim data yang di-fetch dari server (SSR) ke komponen Client (CSR)
          agar komponen Client punya data awal untuk dirender tanpa harus loading.
        */}
        <ProductList 
          initialProducts={initialData.data} 
          initialMeta={initialData.meta} 
        />
      </div>
    </main>
  );
}