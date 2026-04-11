import ProductList from "@/components/ProductList";
import { fetchProducts } from "@/lib/api";

// Di Next.js terbaru, searchParams bersifat Asynchronous (Promise)
type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Home(props: Props) {
  // Tunggu dan baca parameter dari URL
  const searchParams = await props.searchParams;

  const search = searchParams.search || "";
  const marketplace = searchParams.marketplace || "";
  const sort_by = searchParams.sort_by || "createdAt";
  const sort_order = searchParams.sort_order || "-1";

  // SSR Fetching: Tembak ke Golang berdasarkan filter URL
  const initialData = await fetchProducts({
    search,
    marketplace,
    sort_by,
    sort_order,
    page: 1, // SSR selalu memuat halaman 1 dari filter tersebut
    limit: 12,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Katalog Produk</h1>
          <p className="text-gray-600">
            Kumpulan data produk hasil ekstraksi dari berbagai marketplace.
          </p>
        </div>

        {/* Kirim data SSR beserta Filter aktif saat ini ke Client */}
        <ProductList 
          initialProducts={initialData.data} 
          initialMeta={initialData.meta} 
          currentFilters={{ search, marketplace, sort_by, sort_order }}
        />
      </div>
    </main>
  );
}