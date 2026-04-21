import { useTranslations } from "next-intl";
import Link from "next/link";
import FormRegister from "./FormRegister";
import Information from "./Information";

export default function RegisterPage() {
  const t = useTranslations("Register");

  return (
    <div className="min-h-screen flex bg-background-default">
      <Information />

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              {t("title")}
            </h2>
            <p className="text-text-secondary lg:hidden">{t("subtitle")}</p>
          </div>

          <FormRegister />

          <p className="text-center text-text-secondary mt-8">
            {t("have_account")}{" "}
            <Link
              href="/login"
              className="text-primary-main font-bold hover:underline"
            >
              {t("login_link")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
