import { fetchDeals } from "@/lib/api";
import Link from "next/link";
import { formatRupiah, generateSlug } from "../product/[id]/page";
import Image from "@/components/Image";
import Ripple from "@/components/ui/Ripple";
import { getTranslations } from "next-intl/server";

const MARKETPLACE_COLORS: Record<string, string> = {
  shopee: "#EE4D2D",
  tokopedia: "#42B549",
  lazada: "#0F146D",
};

export default async function FeaturedDeals() {
  const dealsRes = await fetchDeals();
  const deals = dealsRes.data || [];
  const t = await getTranslations("HomePage.FeaturedDeals");

  if (deals.length === 0) return null;

  return (
    <section className="py-16 border-t border-divider/30 relative">
      {/* Subtle background */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary-main/4 blur-[130px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/3" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-main/8 border border-error-main/20 text-error-main text-[10px] font-black uppercase tracking-[0.2em] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-error-main animate-pulse" />
          {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter">
          {t("title")} <span className="text-error-main">{t("title_accent")}</span>
          </h2>
          <p className="text-text-secondary text-sm mt-2 font-medium">
          {t("description")}
          </p>
        </div>
        <Link
          href="/search/deals"
          className="group flex items-center gap-2 text-primary-main font-black text-[10px] uppercase tracking-widest bg-primary-main/8 px-6 py-3 rounded-full border border-primary-main/20 hover:bg-primary-main hover:text-white transition-all shrink-0"
        >
          <Ripple />
          {t("monitor_all")}{" "}
          <span className="text-lg group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {deals.map((deal) => {
          const mpKey = deal.marketplace?.toLowerCase() || "";
          const mpColor = MARKETPLACE_COLORS[mpKey] || "#6b7280";
          return (
            <div
              key={deal.id}
              className="group bg-background-paper border border-divider/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-divider hover:-translate-y-1.5 transition-all duration-400 flex flex-col"
            >
              {/* Marketplace header strip */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-b border-divider/40"
                style={{ backgroundColor: `${mpColor}10` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: mpColor }}
                  />
                  <span
                    className="text-[11px] font-black uppercase tracking-widest"
                    style={{ color: mpColor }}
                  >
                    {deal.marketplace}
                  </span>
                </div>
                {deal.discount_percent > 0 && (
                  <span className="bg-error-main text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                    -{deal.discount_percent}%
                  </span>
                )}
              </div>

              {/* Product image */}
              <div className="h-44 bg-background-default flex items-center justify-center overflow-hidden relative p-4">
                <Image
                  width={300}
                  height={176}
                  src={`${process.env.NEXT_IMAGES_HOSTNAME}/${deal.image_url}`}
                  alt={deal.name}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-text-primary text-sm line-clamp-2 leading-snug group-hover:text-primary-main transition-colors mb-3">
                  {deal.name}
                </h3>

                <div className="mt-auto">
                  {deal.price_original > deal.price_rp && (
                    <p className="text-[11px] text-text-disabled line-through mb-0.5">
                      {formatRupiah(deal.price_original)}
                    </p>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-black text-text-primary tracking-tighter">
                      {formatRupiah(deal.price_rp)}
                    </p>
                    {deal.price_original > deal.price_rp && (
                      <span className="text-[10px] font-black text-success-main bg-success-main/10 px-2 py-0.5 rounded-full">
                        {t("cta")}
                      </span>
                    )}
                  </div>

                  <Link
                    href={generateSlug(deal.name, deal.id)}
                    className="relative w-full py-3 rounded-2xl text-center text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor: `${mpColor}15`,
                      color: mpColor,
                      border: `1px solid ${mpColor}30`,
                    }}
                  >
                    <Ripple />
                    {t("compare")}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
