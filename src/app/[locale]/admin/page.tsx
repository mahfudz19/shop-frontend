import { getMyData, getStatsAdmin } from "@/lib/api";

export default async function AdminDashboard() {
  const myAcount = await getMyData();
  const stats = await getStatsAdmin();

  console.log({ myAcount, stats });

  return (
    <div className="container mx-auto bg-background-paper p-6 rounded-xl shadow border border-divider">
      <p>
        Halaman ini otomatis terproteksi oleh Middleware. Hanya user dengan
        cookie valid yang bisa melihat ini.
      </p>
    </div>
  );
}
