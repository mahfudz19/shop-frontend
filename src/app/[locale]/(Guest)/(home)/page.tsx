import { CategoryGrid, MagazineSection } from "./ContentGrid";
import FeaturedDeals from "./FeaturedDeals";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Trust from "./Trust";

export default async function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO — First impression: Marketplace + Price Comparison */}
      <Hero />

      {/* 2. CATEGORY CHIPS — Quick navigation (compact) */}
      <CategoryGrid />

      {/* 3. HOW IT WORKS — Educate new users in 3 steps */}
      <HowItWorks />

      {/* 4. FEATURED DEALS — Show live marketplace data */}
      <FeaturedDeals />

      {/* 5. TRUST SIGNALS — Build credibility */}
      <Trust />

      {/* 6. MAGAZINE — Editorial content, always last */}
      <MagazineSection />
    </main>
  );
}
