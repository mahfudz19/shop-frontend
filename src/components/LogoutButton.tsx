"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Nanti: Panggil endpoint Golang untuk menghapus cookie
    // await fetch("/api/auth/logout", { method: "POST" });

    // Asumsi sementara cookie sudah terhapus
    router.push("/login");

    // SANGAT PENTING: Memaksa Next.js merender ulang Server Components (termasuk Header)
    // agar status login yang baru terbaca.
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 font-medium px-4 py-2 transition-colors"
    >
      Keluar
    </button>
  );
}
