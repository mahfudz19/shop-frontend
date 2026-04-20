import { fetchStats } from "@/lib/api";
import { getTranslations } from "next-intl/server";

export default async function Trust() {
  const statsRes = await fetchStats();
  const stats = statsRes.data || { total_products: 0, total_shops: 0 };
  const t = await getTranslations("HomePage.Trust");

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k+";
    return num.toString();
  };

  return (
    <section className="relative py-20 my-16 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-primary-dark to-[#0A0A0A] text-primary-contrast shadow-2xl">
      {/* BACKGROUND DECORATION - DNA: Modern Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-main/20 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-main/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* SISI KIRI: STATEMENT & TRUST SIGNAL (5 Column) */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-main"></span>
              </span>
              {t("sys_security_audit")}
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight">
              {t("title1")} <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
              >
                {t("title2")}
              </span>{" "}
              {t("title3")}
            </h2>

            <p className="text-lg opacity-70 mb-8 font-medium leading-relaxed max-w-md">
              {t("description")}
            </p>

            <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-4xl">⭐</div>
              <div>
                <div className="text-2xl font-black tracking-tighter">
                  4.8/5.0
                </div>
                <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                  {t("sys_user_rating")}
                </div>
              </div>
            </div>
          </div>

          {/* SISI KANAN: LIVE STATS GRID (7 Column) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* STAT CARD 1: TOTAL PRODUCTS */}
            <div className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                  📊
                </span>
                <span className="text-[9px] font-bold text-success-main bg-success-main/20 px-2 py-0.5 rounded uppercase">
                  {t("sys_live_database")}
                </span>
              </div>
              <div className="text-4xl font-black mb-1 tracking-tighter">
                {formatNumber(stats.total_products)}
              </div>
              <p className="text-xs font-bold opacity-50 uppercase tracking-widest leading-snug">
                {t("active_products_desc_1")} <br />{" "}
                {t("active_products_desc_2")}
              </p>
            </div>

            {/* STAT CARD 2: VERIFIED SHOPS */}
            <div className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                  🛡️
                </span>
                <span className="text-[9px] font-bold text-primary-light bg-primary-light/20 px-2 py-0.5 rounded uppercase">
                  {t("sys_verified_only")}
                </span>
              </div>
              <div className="text-4xl font-black mb-1 tracking-tighter">
                {formatNumber(stats.total_shops)}
              </div>
              <p className="text-xs font-bold opacity-50 uppercase tracking-widest leading-snug">
                {t("verified_shops_desc_1")} <br /> {t("verified_shops_desc_2")}
              </p>
            </div>

            {/* STAT CARD 3: PRICE HISTORY */}
            <div className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                  📉
                </span>
              </div>
              <h4 className="text-lg font-black mb-1 uppercase tracking-tight">
                {t("history_title")}
              </h4>
              <p className="text-xs font-medium opacity-60 leading-relaxed">
                {t("history_desc")}
              </p>
            </div>

            {/* STAT CARD 4: NEUTRALITY */}
            <div className="group bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                  ✅
                </span>
              </div>
              <h4 className="text-lg font-black mb-1 uppercase tracking-tight">
                {t("neutral_title")}
              </h4>
              <p className="text-xs font-medium opacity-60 leading-relaxed">
                {t("neutral_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
