import { CategoryGrid, MagazineSection } from "./ContentGrid";
import Hero from "./Hero";
import ProductList from "./ProductList";
import Trust from "./Trust";

import { fetchProducts } from "@/lib/api";

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
    page: 1,
    limit: 12,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Seksi 2: Hero */}
      <Hero />

      {/* Seksi 3: Category Grid */}
      <CategoryGrid />

      {/* Seksi 4: Katalog / Penawaran (ProductList Anda) */}
      <section className="py-12 border-t border-gray-200">
        <h2 className="text-2xl font-black mb-6 text-gray-900">
          Angebote & Penawaran Terbatas
        </h2>
        <ProductList
          initialProducts={initialData.data}
          initialMeta={initialData.meta}
          currentFilters={{ search, marketplace, sort_by, sort_order }}
        />
      </section>

      {/* Seksi 5: Magazin */}
      <MagazineSection />

      {/* Seksi 6: Trust Signals */}
      <Trust />
    </main>
  );
}
