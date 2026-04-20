import Image from "@/components/Image";
import { fetchCategories, fetchArticles } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function CategoryGrid() {
  const catRes = await fetchCategories();
  const categories = (catRes.data || []).filter((c: any) => c.is_popular);
  const t = await getTranslations("HomePage.CategoryGrid");


  if (categories.length === 0) return null;

  return (
    <section className="py-8 border-t border-divider/30">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.25em]">
          {t("sys_exploration_mode")}
        </span>
        <div className="flex-1 h-px bg-divider/50" />
        <Link
          href="/search"
          className="text-[11px] font-black text-primary-main uppercase tracking-wider hover:underline"
        >
          {t("view_all")} &rarr;
        </Link>
      </div>

      {/* Horizontal scroll chip row */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat: any) => (
          <Link
            href={`/search/${cat.slug}`}
            key={cat.id}
            className="group flex items-center gap-2.5 px-4 py-2 bg-background-paper border border-divider rounded-full text-sm font-bold text-text-secondary hover:text-primary-main hover:border-primary-main/40 hover:shadow-md hover:bg-primary-main/4 transition-all"
          >
            {cat.icon_url ? (
              <Image
                src={cat.icon_url}
                alt={cat.name}
                className="w-5 h-5 object-contain"
                width={20}
                height={20}
              />
            ) : (
              <span className="text-base leading-none">📦</span>
            )}
            <span className="group-hover:text-primary-main transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function MagazineSection() {
  const artRes = await fetchArticles();
  const articles = artRes.data || [];
  const t = await getTranslations("HomePage.MagazineSection");

  if (articles.length === 0) return <></>;

  return (
    <section className="py-16 border-t border-divider/30">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-divider to-divider"></div>
        <div className="text-center px-4">
          <span className="text-[10px] font-black text-secondary-main uppercase tracking-[0.4em] mb-2 block">
            {t("sys_editorial_board")}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter uppercase">
            {t("title1")}{" "}
            <span className="text-secondary-main">{t("title2")}</span>
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
                <time className="text-[10px] font-bold text-text-disabled uppercase">
                  {t("published")}{" "}
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
                  {t("by")} {article.author || t("sys_admin")}
                </span>
                <span className="text-xs font-bold text-secondary-main group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {t("read_analysis")} <span className="text-lg">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
