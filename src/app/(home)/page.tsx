import { fetchProducts } from "@/lib/api";
import Hero from "./Hero";
import { CategoryGrid, MagazineSection } from "./ContentGrid";
import Trust from "./Trust";
import ProductList from "../search/[search]/ProductList";
import FeaturedDeals from "./FeaturedDeals";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const filter = {
    search: searchParams.search || "",
    marketplace: searchParams.marketplace || "",
    sort_by: searchParams.sort_by || "createdAt",
    sort_order: searchParams.sort_order || "-1",
    page: 1,
    limit: 12,
  };

  const initialData = await fetchProducts(filter);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO & CATEGORIES (Aman untuk dilihat pertama kali) */}
      <Hero />
      <CategoryGrid />

      {/* 2. MAGAZINE (Dipindah ke atas agar selalu terbaca) */}
      <MagazineSection />

      {/* 3. TRUST SIGNALS (Dipindah ke atas) */}
      <Trust />

      {/* 4. INFINITE SCROLL CATALOG (Diletakkan PALING BAWAH) 
          Sekarang pengguna bisa scroll produk sampai habis 
          sebelum menyentuh Footer! 
      */}
      <section className="py-12 border-t border-gray-200 mt-8">
        <h2 className="text-2xl font-black mb-6 text-gray-900">
          Top Deals & Offers
        </h2>
        <FeaturedDeals />
      </section>
    </main>
  );
}
