import { useTranslations } from "next-intl";

function Information() {
  const t = useTranslations("Register");

  return (
    <div className="hidden lg:flex lg:w-full bg-primary-main relative flex-col justify-center p-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 text-primary-contrast max-w-lg mx-auto">
        <h1 className="text-4xl font-black mb-6">{t("title")}</h1>
        <p className="text-lg opacity-90 mb-12">{t("subtitle")}</p>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl rounded-tl-none mt-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">{t("benefit_1_title")}</h3>
              <p className="opacity-75">{t("benefit_1_desc")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl rounded-tl-none mt-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">{t("benefit_2_title")}</h3>
              <p className="opacity-75">{t("benefit_2_desc")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl rounded-tl-none mt-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                ></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-xl">{t("benefit_3_title")}</h3>
              <p className="opacity-75">{t("benefit_3_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
