import { fetchPromotions } from "@/lib/api";
import Link from "next/link";
import LiveDealCarousel from "./LiveDealCarousel";

export default async function Hero() {
  const promoRes = await fetchPromotions();
  const promos = promoRes.data || [];

  return (
    <section className="relative py-12 md:py-20 min-h-150 flex items-center overflow-hidden rounded-3xl bg-linear-to-br from-background-default to-background-paper mt-4 border border-divider/50 shadow-sm">
      {/* BACKGROUND DECORATION (Modern Glow) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-main/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary-main/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* LAPISAN 1: COPYWRITING (Bersih & Meyakinkan) */}
          <div className="flex-1 lg:mb-0 mb-8 z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-main/10 text-primary-main text-xs font-bold mb-6 border border-primary-main/20 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-main"></span>
              </span>
              Mesin Pencari Harga Termurah
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.1] tracking-tight mb-6">
              Berhenti Membayar <br />
              <span className="text-error-main relative inline-block">
                Lebih Mahal.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-error-main/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-lg text-text-secondary text-base md:text-lg leading-relaxed mb-8">
              Kecerdasan buatan kami memindai jutaan produk dari{" "}
              <strong className="text-text-primary">
                Tokopedia, Shopee, dan Lazada
              </strong>{" "}
              dalam hitungan detik. Bandingkan secara real-time, temukan
              selisihnya, dan hemat uang Anda.
            </p>

            {/* QUICK ACCESS (Modern Pills) */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <span className="text-sm font-semibold text-text-disabled">
                Populer:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Smartphone", icon: "📱" },
                  { name: "Tenda Camping", icon: "⛺" },
                  { name: "Jaket Parka", icon: "🧥" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={`/search/${item.name.toLowerCase().replace(" ", "-")}`}
                    className="bg-background-paper border border-divider px-4 py-2 rounded-full text-sm font-bold text-text-secondary hover:text-primary-main hover:border-primary-main hover:shadow-md transition-all flex items-center gap-2"
                  >
                    <span>{item.icon}</span> {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* LAPISAN 2: THE SMART CAROUSEL */}
          <div className="relative shrink-0 w-full max-w-sm lg:max-w-md xl:max-w-lg flex justify-center lg:justify-end z-30">
            <LiveDealCarousel promos={promos} />

            {/* LAPISAN 3: LIVE NOTIFICATION (Modern Toast Float) */}
            <div className="hidden md:flex absolute -bottom-16 -left-12 bg-background-paper backdrop-blur-md p-4 rounded-2xl border border-divider shadow-xl z-40 items-center gap-4 max-w-70 transform hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-success-light/20 flex items-center justify-center text-success-main shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">
                  Aktivitas Terbaru
                </p>
                <p className="text-xs font-bold text-text-primary leading-snug">
                  Seseorang baru saja menghemat{" "}
                  <span className="text-success-main">Rp 150.000</span> dari
                  pembelian Tenda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
