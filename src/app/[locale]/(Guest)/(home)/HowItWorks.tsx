import { getTranslations } from "next-intl/server";

export default async function HowItWorks() {
  const t = await getTranslations("HomePage.HowItWorks");

  const steps = [
    {
      step: "01",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      ),
      title: t("step1_title"),
      desc: t("step1_desc"),
      accent: "text-primary-main",
      bg: "bg-primary-main/8 border-primary-main/20",
    },
    {
      step: "02",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
          />
        </svg>
      ),
      title: t("step2_title"),
      desc: t("step2_desc"),
      accent: "text-secondary-main",
      bg: "bg-secondary-main/8 border-secondary-main/20",
    },
    {
      step: "03",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      title: t("step3_title"),
      desc: t("step3_desc"),
      accent: "text-success-main",
      bg: "bg-success-main/8 border-success-main/20",
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-divider/50 border border-divider text-text-disabled text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          {t("eyebrow")}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter">
          {t("title")} <span className="text-primary-main">{t("title_accent")}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-14 left-[25%] right-[25%] h-px border-t-2 border-dashed border-divider z-0" />

        {steps.map((s, i) => (
          <div
            key={i}
            className={`relative bg-background-paper border rounded-3xl p-8 text-center hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg ${s.bg}`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-background-paper border border-divider shadow-sm ${s.accent}`}
            >
              {s.icon}
            </div>
            <p
              className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${s.accent}`}
            >
              {t("step_label")} {s.step}
            </p>
            <h3 className="text-xl font-black text-text-primary tracking-tight mb-3">
              {s.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
