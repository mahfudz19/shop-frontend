import Image from "@/components/Image";
import { fetchArticleBySlug } from "@/lib/api";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function MagazinePage(props: Props) {
  const params = await props.params;
  const t = await getTranslations("HomePage.MagazineSection");

  const { data: article } = await fetchArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const publishedDate = new Date(article.publishedAt || article.createdAt);
  const formattedDate = publishedDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="min-h-screen pb-24">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary-main/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary-main/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-text-disabled">
            <Link href="/" className="hover:text-primary-main transition-colors">
              HOME
            </Link>
            <span className="text-divider">/</span>
            <span className="text-secondary-main">MAGAZINE</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Header Text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-main/10 border border-secondary-main/20 text-secondary-main text-[10px] font-black uppercase tracking-widest mb-6">
                {article.tags?.[0] || "EDITORIAL"}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter leading-[1.05] mb-8 balance">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-divider/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-divider/30 flex items-center justify-center border border-divider overflow-hidden">
                    <span className="text-[10px] font-black opacity-50">
                      {article.author?.[0] || "A"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-text-disabled uppercase tracking-widest leading-none mb-1">
                      {t("by")}
                    </span>
                    <span className="text-xs font-bold text-text-primary uppercase tracking-tight">
                      {article.author || t("sys_admin")}
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-divider/30 hidden sm:block" />

                <div>
                  <span className="block text-[10px] font-black text-text-disabled uppercase tracking-widest leading-none mb-1">
                    {t("published")}
                  </span>
                  <time className="text-xs font-bold text-text-primary uppercase tracking-tight">
                    {formattedDate}
                  </time>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 w-full">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-secondary-main/10 border border-divider/50">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-background-default/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT SECTION */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="relative">
          {/* Side Indicator Line */}
          <div className="absolute -left-8 top-0 bottom-0 w-px bg-linear-to-b from-secondary-main/50 via-divider to-transparent hidden xl:block" />

          {/* Article Lead / Excerpt (Optional styling for first paragraph) */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase 
              prose-p:text-text-secondary prose-p:leading-relaxed prose-p:text-lg
              prose-blockquote:border-l-4 prose-blockquote:border-secondary-main prose-blockquote:bg-secondary-main/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
              prose-strong:text-text-primary prose-strong:font-black
              prose-a:text-secondary-main prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags Footer */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-20 pt-10 border-t border-divider/30">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-4 h-4 text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01M19 7h.01M19 11h.01M19 15h.01M3 3h18v18H3V3z" />
                </svg>
                <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em]">
                  TAGS_DATABASE
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-background-paper border border-divider hover:border-secondary-main/50 text-text-secondary hover:text-secondary-main text-xs font-bold rounded-xl transition-all cursor-default"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. NAVIGATION SECTION */}
      <section className="container mx-auto px-4 max-w-5xl mt-24">
        <div className="bg-background-paper rounded-[2.5rem] p-8 md:p-12 border border-divider/50 shadow-xl relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary-main/10 transition-colors" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black text-secondary-main uppercase tracking-[0.3em] mb-3 block">
                CONTINUE_READING
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-text-primary tracking-tighter uppercase whitespace-normal lg:whitespace-nowrap">
                Eksplorasi Jurnal <span className="text-secondary-main">Lainnya</span>
              </h2>
            </div>
            
            <Link 
              href="/"
              className="px-8 py-4 bg-primary-main text-primary-contrast rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary-main/20 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all"
            >
              Kembali Ke Dashboard
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
