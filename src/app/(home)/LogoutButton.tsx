"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

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
      Keluar
    </button>
  );
}
