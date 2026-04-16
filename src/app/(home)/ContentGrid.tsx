import Image from "@/components/Image";
import { fetchCategories, fetchArticles } from "@/lib/api";
import Link from "next/link";

export async function CategoryGrid() {
  const catRes = await fetchCategories();
  // Hanya tampilkan kategori yang ditandai IsPopular oleh admin
  const categories = (catRes.data || []).filter((c: any) => c.is_popular);

  if (categories.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-black mb-6 text-text-primary">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat: any) => (
          <Link href={`/search/${cat.slug}`} key={cat.id}>
            <div className="bg-background-paper p-6 rounded-md border border-divider shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer h-full">
              {/* Jika admin belum set IconURL, gunakan emoji kotak 📦 */}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {cat.icon_url ? (
                  <img
                    src={cat.icon_url}
                    alt={cat.name}
                    className="w-10 h-10 mx-auto"
                  />
                ) : (
                  "📦"
                )}
              </div>
              <span className="font-bold text-sm text-text-primary">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function MagazineSection() {
  const artRes = await fetchArticles();
  const articles = artRes.data || [];

  if (articles.length === 0) return null;

  return (
    <section className="py-12 border-t border-divider">
      <h2 className="text-2xl font-black mb-6 text-text-primary">
        {process.env.NEXT_PUBLIC_APP_NAME} Magazine
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <Link
            href={`/magazine/${article.slug}`}
            key={article.id}
            className="group cursor-pointer block"
          >
            <div className="aspect-video bg-background-default border border-divider rounded-md overflow-hidden mb-4 relative">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={380}
                height={212}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span className="text-secondary-main font-bold text-xs uppercase tracking-widest">
              {article.tags?.[0] || "Guide"}
            </span>
            <h3 className="text-lg font-bold text-text-primary mt-2 line-clamp-2 leading-snug group-hover:text-primary-main transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-text-secondary mt-2 line-clamp-2 italic">
              {article.content}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
