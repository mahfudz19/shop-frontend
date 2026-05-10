import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import FormLogin from "./FormLogin";
import Information from "./Information";

export default function LoginPage() {
  const t = useTranslations("Login");

  return (
    <>
      <Information />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-10 mt-12 lg:mt-0">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-text-primary tracking-tighter uppercase mb-2">
              {t("welcome_back")}
            </h2>
            <p className="text-text-secondary text-sm font-medium">
              {t("monitor_desc")}
            </p>
          </div>

          <FormLogin />

          <p className="text-center text-text-secondary text-xs font-medium">
            {t("no_account")}{" "}
            <Link
              href="/register"
              className="text-primary-main font-bold hover:underline transition-colors ml-1"
            >
              {t("register_link")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
