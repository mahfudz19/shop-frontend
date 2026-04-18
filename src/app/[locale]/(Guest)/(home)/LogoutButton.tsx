"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("HomePage.LogoutButton");

  const handleLogout = async () => {
    // Nanti: Panggil endpoint Golang untuk menghapus cookie
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-error-main hover:text-error-dark font-medium px-4 py-2 transition-colors rounded-sm"
    >
      {t("logout")}
    </button>
  );
}
