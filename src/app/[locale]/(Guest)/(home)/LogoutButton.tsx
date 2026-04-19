"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { logout } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("HomePage.LogoutButton");

  const handleLogout = async () => {
    try {
      await logout();

      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
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
