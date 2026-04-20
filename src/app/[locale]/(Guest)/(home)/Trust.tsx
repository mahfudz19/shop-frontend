import { fetchStats } from "@/lib/api";
import { getTranslations } from "next-intl/server";

export default async function Trust() {
  const statsRes = await fetchStats();
  const stats = statsRes.data || { total_products: 0, total_shops: 0 };
  const t = await getTranslations("HomePage.Trust");

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(0) + "k+";
    return num.toString();
  };

  const STATS = [
    {
      value: formatNumber(stats.total_products),
      label: t("stat1_label"),
      sub: t("stat1_sub"),
      icon: "📊",
      color: "text-primary-main",
      bg: "bg-primary-main/8 border-primary-main/15",
    },
    {
      value: formatNumber(stats.total_shops),
      label: t("stat2_label"),
      sub: t("stat2_sub"),
      icon: "🛡️",
      color: "text-success-main",
      bg: "bg-success-main/8 border-success-main/15",
    },
    {
      value: t("stat3_value"),
      label: t("stat3_label"),
      sub: t("stat3_sub"),
      icon: "📉",
      color: "text-secondary-main",
      bg: "bg-secondary-main/8 border-secondary-main/15",
    },
    {
      value: t("stat4_value"),
      label: t("stat4_label"),
      sub: t("stat4_sub"),
      icon: "⚖️",
      color: "text-warning-main",
      bg: "bg-warning-main/8 border-warning-main/15",
    },
  ];

  return (
    <section className="py-16 border-t border-divider/30">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter mb-3">
          {t("title")}{" "}
          <span className="text-primary-main">{t("title_accent")}</span>
        </h2>
        <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl border flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300 ${s.bg}`}
          >
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div
                className={`text-3xl font-black tracking-tighter ${s.color}`}
              >
                {s.value}
              </div>
              <div className="text-sm font-black text-text-primary mt-1">
                {s.label}
              </div>
              <div className="text-[11px] text-text-disabled mt-0.5 leading-snug">
                {s.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
