import { getMyData, getStatsAdmin } from "@/lib/api";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const myAcount = await getMyData(token);
  const stats = await getStatsAdmin(token);

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
