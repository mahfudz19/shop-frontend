import { useTranslations } from "next-intl";

function Information() {
  const t = useTranslations("Login");

  return (
    <div className="hidden lg:flex lg:w-full bg-primary-main relative flex-col justify-center p-12 overflow-hidden border-r border-divider/20">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid-login"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-login)" />
        </svg>
      </div>

      <div className="relative z-10 text-primary-contrast max-w-lg mx-auto">
        <div className="mb-12">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-main font-black text-2xl mb-6 shadow-2xl">
            SS
          </div>
          <h1 className="text-4xl font-black mb-4 leading-tight uppercase tracking-tighter">
            {t("title")}
          </h1>
          <p className="text-lg opacity-80 font-medium leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-5 group">
            <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-1">
                {t("feature_1_title")}
              </h3>
              <p className="text-sm opacity-60 font-medium leading-relaxed">
                {t("feature_1_desc")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5 group">
            <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-1">
                {t("feature_2_title")}
              </h3>
              <p className="text-sm opacity-60 font-medium leading-relaxed">
                {t("feature_2_desc")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5 group">
            <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-tight mb-1">
                {t("feature_3_title")}
              </h3>
              <p className="text-sm opacity-60 font-medium leading-relaxed">
                {t("feature_3_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
