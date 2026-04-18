import Image from "@/components/Image";
import { fetchCategories, fetchArticles } from "@/lib/api";
import Link from "next/link";

export async function CategoryGrid() {
  const catRes = await fetchCategories();
  const categories = (catRes.data || []).filter((c: any) => c.is_popular);

  if (categories.length === 0) return null;

  return (
    <section className="py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/10 border border-primary-light/20 text-primary-main text-[10px] font-black uppercase tracking-widest mb-3">
            Exploration_Mode
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter uppercase">
            Pusat <span className="text-primary-main">Kategori</span>
          </h2>
        </div>
        <p className="text-text-secondary text-sm font-medium max-w-xs md:text-right leading-relaxed">
          Navigasi cepat ke database produk berdasarkan spesialisasi sistem
          kami.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat: any) => (
          <Link href={`/search/${cat.slug}`} key={cat.id} className="group">
            <div className="h-full bg-background-paper border border-divider/50 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary-main/30 hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
              {/* Background Accent Deco */}
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-primary-main/5 rounded-full blur-xl group-hover:bg-primary-main/10 transition-colors"></div>

              <div className="w-16 h-16 rounded-2xl bg-background-default flex items-center justify-center text-3xl mb-4 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {cat.icon_url ? (
                  <Image
                    src={cat.icon_url}
                    alt={cat.name}
                    className="w-10 h-10 object-contain"
                    width={40}
                    height={40}
                  />
                ) : (
                  <span className="opacity-80">📦</span>
                )}
              </div>

              <span className="font-black text-xs md:text-sm text-text-primary uppercase tracking-wider group-hover:text-primary-main transition-colors">
                {cat.name}
              </span>

              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] font-bold text-primary-main bg-primary-light/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  Scan Data &rarr;
                </span>
              </div>
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

  if (articles.length === 0) return <></>;

  return (
    <section className="py-16 border-t border-divider/30">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-divider to-divider"></div>
        <div className="text-center px-4">
          <span className="text-[10px] font-black text-secondary-main uppercase tracking-[0.4em] mb-2 block">
            The_Editorial_Board
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter uppercase">
            Jurnal <span className="text-secondary-main">Belanja</span>
          </h2>
        </div>
        <div className="h-px flex-1 bg-linear-to-l from-transparent via-divider to-divider"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {articles.map((article: any) => (
          <Link
            href={`/magazine/${article.slug}`}
            key={article.id}
            className="group flex flex-col h-full"
          >
            <div className="relative aspect-16/10 rounded-3xl overflow-hidden mb-6 shadow-lg group-hover:shadow-secondary-main/10 transition-all duration-500">
              <Image
                src={article.thumbnail}
                alt={article.title}
                width={500}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay Label */}
              <div className="absolute top-4 left-4">
                <span className="bg-background-paper/90 backdrop-blur-md text-text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-sm uppercase tracking-widest border border-divider/50">
                  {article.tags?.[0] || "Report"}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 px-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-secondary-main"></div>
                <time className="text-[10px] font-mono font-bold text-text-disabled uppercase">
                  Published:{" "}
                  {new Date().toLocaleDateString("id-ID", {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h3 className="text-xl font-black text-text-primary mb-3 group-hover:text-secondary-main transition-colors leading-tight line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-6 font-medium italic opacity-80">
                "{article.content}"
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-divider/30">
                <span className="text-[10px] font-black text-text-primary uppercase tracking-tighter">
                  By {article.author || "System_Admin"}
                </span>
                <span className="text-xs font-bold text-secondary-main group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Analysis <span className="text-lg">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
