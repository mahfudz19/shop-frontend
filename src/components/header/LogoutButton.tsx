"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { logout } from "@/lib/api";
import toast from "@/components/ui/Toast";

export default function LogoutButton() {
  const router = useRouter();
  const t = useTranslations("HomePage.LogoutButton");

  const handleLogout = async () => {
    try {
      await logout();

      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
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
