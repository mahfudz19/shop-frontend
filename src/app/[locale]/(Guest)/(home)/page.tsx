import { CategoryGrid, MagazineSection } from "./ContentGrid";
import FeaturedDeals from "./FeaturedDeals";
import Hero from "./Hero";
import Trust from "./Trust";

export default async function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO & CATEGORIES (Aman untuk dilihat pertama kali) */}
      <Hero />
      <CategoryGrid />

      {/* 2. MAGAZINE (Dipindah ke atas agar selalu terbaca) */}
      <MagazineSection />

      {/* 3. TRUST SIGNALS (Dipindah ke atas) */}
      <Trust />

      <FeaturedDeals />
    </main>
  );
}
