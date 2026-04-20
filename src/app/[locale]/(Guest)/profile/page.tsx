import { getMyData } from "@/lib/api";
import { cookies } from "next/headers";
import Ripple from "@/components/ui/Ripple";
import Link from "next/link";

async function Profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const response = await getMyData(token);
  const user = response?.data;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-text-secondary container mx-auto px-4">
        <div className="w-16 h-16 bg-error-main/10 rounded-full flex items-center justify-center text-2xl mb-4 border border-error-main/20 animate-pulse">
          🔒
        </div>
        <h1 className="text-xl font-black uppercase tracking-[0.2em] mb-2">
          ACCESS_DENIED
        </h1>
        <p className="text-sm opacity-70">
          Silakan login untuk mengakses profil sistem Anda.
        </p>
        <Link
          href="/login"
          className="mt-6 px-6 py-2 bg-primary-main text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary-main/20"
        >
          Login Sistem
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* 1. PROFILE HEADER / HERO */}
      <div className="relative mb-10 p-8 rounded-[2rem] bg-background-paper border border-divider shadow-xl shadow-primary-main/5 overflow-hidden group">
        {/* Background Decorative Aksi */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-main/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Section */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-linear-to-br from-primary-main to-primary-dark flex items-center justify-center text-white text-4xl md:text-5xl font-black shadow-2xl border-4 border-background-paper relative">
              {user.name[0].toUpperCase()}
              {/* Online Indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-main border-4 border-background-paper rounded-full" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-light/10 border border-success-main/20 text-success-main text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 bg-success-main rounded-full animate-pulse" />
              Account_Active: OK
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter mb-2 uppercase leading-none">
              {user.name}
            </h1>
            <p className="text-text-secondary font-medium opacity-80 mb-6">
              Authenticated via{" "}
              <span className="text-primary-main font-bold">{user.email}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-background-default border border-divider rounded-lg text-[10px] font-black text-text-disabled uppercase tracking-widest">
                Role: {user.role}
              </span>
              <span className="px-3 py-1 bg-background-default border border-divider rounded-lg text-[10px] font-black text-text-disabled uppercase tracking-widest">
                Tier: Platinum_User
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TECHNICAL METADATA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-background-paper border border-divider shadow-sm">
          <h2 className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="text-primary-main">🆔</span> SYSTEM_IDENTITY
          </h2>
          <div className="space-y-4 font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-text-disabled uppercase">
                Unique_Node_ID
              </span>
              <span className="text-xs text-text-primary font-bold break-all">
                {user.id}
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-4 border-t border-divider/40">
              <span className="text-[10px] text-text-disabled uppercase">
                Access_Permission
              </span>
              <span className="text-xs text-text-primary font-bold uppercase">
                {user.role}_AUTHORITY
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-background-paper border border-divider shadow-sm">
          <h2 className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="text-secondary-main">📅</span> TIMESTAMPS
          </h2>
          <div className="space-y-4 font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-text-disabled uppercase">
                Synchronization_Date
              </span>
              <span className="text-xs text-text-primary font-bold">
                {formatDate(user.createdAt)}
              </span>
            </div>
            <div className="flex flex-col gap-1 pt-4 border-t border-divider/40">
              <span className="text-[10px] text-text-disabled uppercase">
                Last_Node_Update
              </span>
              <span className="text-xs text-text-primary font-bold">
                {formatDate(user.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECURITY & ACTIONS */}
      <div className="p-8 rounded-[2rem] bg-background-paper/60 backdrop-blur-md border border-divider shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-main/10 flex items-center justify-center text-xl border border-primary-main/20">
            🛡️
          </div>
          <div>
            <h3 className="font-black text-text-primary uppercase tracking-tight mb-1 leading-none">
              Security_Matrix
            </h3>
            <p className="text-xs text-text-secondary opacity-70">
              Kelola otentikasi dua faktor dan enkripsi kata sandi akun Anda.
            </p>
          </div>
        </div>

        <button className="relative px-8 py-3 bg-background-paper border border-primary-main/30 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-primary-main hover:bg-primary-main hover:text-white transition-all overflow-hidden group/btn">
          <Ripple />
          Modify_Security
        </button>
      </div>

      {/* 4. FOOTER DISCLAIMER */}
      <div className="mt-12 text-center">
        <p className="text-[9px] font-bold text-text-disabled uppercase tracking-widest opacity-50">
          Internal ScrapStore Management Protocol // UserData_Authorized
        </p>
      </div>
    </div>
  );
}

export default Profile;
