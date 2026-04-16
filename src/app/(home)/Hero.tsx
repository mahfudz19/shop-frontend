import { fetchPromotions } from "@/lib/api";
import Link from "next/link";

export default async function Hero() {
  const promoRes = await fetchPromotions();
  const promos = promoRes.data || [];

  // Ambil promo urutan pertama untuk data dinamis gambar
  const mainPromo = promos.length > 0 ? promos[0] : null;

  // Kategori populer (bentuk Pill / Kapsul)
  const quickAccess = [
    { name: "Smartphone", icon: "📱", slug: "smartphone" },
    { name: "Tenda Camping", icon: "⛺", slug: "camping" },
    { name: "Jaket Parka", icon: "🧥", slug: "parka" },
    { name: "Sneakers", icon: "👟", slug: "sneakers" },
    { name: "Smartwatch", icon: "⌚", slug: "smartwatch" },
  ];

  return (
    <section className="py-8">
      {/* 1. MAIN HERO SPLIT (Kiri: Copywriting, Kanan: Deal Card) */}
      <div className="bg-background-paper rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between border border-divider shadow-sm gap-12 mb-8 relative overflow-hidden">
        {/* Latar belakang aksen abstrak (opsional untuk mempermanis) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-light/20 to-transparent opacity-50 z-0 pointer-events-none"></div>

        {/* --- SISI KIRI: Value Proposition --- */}
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-block bg-error-main/10 text-error-main font-bold text-xs px-3 py-1 rounded-full mb-6 animate-pulse">
            🔥 Update Harga Real-Time
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-text-primary tracking-tight">
            Jangan Bayar <br className="hidden md:block" />
            <span className="text-primary-main">Lebih Mahal.</span>
          </h1>
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Sistem kami membandingkan jutaan produk dari{" "}
            <span className="font-bold text-[#42B549]">Tokopedia</span>,{" "}
            <span className="font-bold text-[#EE4D2D]">Shopee</span>, dan{" "}
            <span className="font-bold text-[#0F146D]">Lazada</span> dalam satu
            layar. Temukan selisih harganya, dan hemat uang Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link
              href={mainPromo?.link_url || "/search/promo"}
              className="bg-primary-main text-primary-contrast px-8 py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-full sm:w-auto text-center"
            >
              Jelajahi Diskon Terdalam
            </Link>

            {/* Trust Signal: Avatar/Logo Marketplace Kecil */}
            <div className="flex -space-x-3 items-center mt-4 sm:mt-0 opacity-90">
              <div className="w-10 h-10 rounded-full border-2 border-background-paper bg-[#42B549] flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                Tkp
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-background-paper bg-[#EE4D2D] flex items-center justify-center text-[10px] text-white font-bold shadow-sm z-10">
                Shp
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-background-paper bg-[#0F146D] flex items-center justify-center text-[10px] text-white font-bold shadow-sm z-20">
                Lzd
              </div>
            </div>
          </div>
        </div>

        {/* --- SISI KANAN: The Live Deal Card --- */}
        <div className="flex-1 w-full max-w-md relative z-10 mt-8 lg:mt-0">
          <div className="relative bg-background-default dark:bg-background-default rounded-2xl border border-divider shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
            {/* Header Card */}
            <div className="p-4 border-b border-divider bg-divider/30 dark:bg-background-paper flex justify-between items-center">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Simulasi Perbandingan
              </span>
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-error-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-error-main"></span>
              </span>
            </div>

            {/* Konten Card */}
            <div className="p-6">
              {mainPromo ? (
                <img
                  src={mainPromo.image_url}
                  alt={mainPromo.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-5xl">
                  📱
                </div>
              )}

              <h3 className="font-bold text-lg mb-4 line-clamp-2 text-text-primary">
                {mainPromo ? mainPromo.title : "Xiaomi Poco X6 Pro 5G (Contoh)"}
              </h3>

              {/* List Harga (Mockup Visual Perbandingan) */}
              <div className="space-y-3">
                {/* Baris 1: Tokopedia */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-divider">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#42B549] flex items-center justify-center text-[10px] text-white font-bold">
                      T
                    </div>
                    <span className="text-sm font-medium text-text-secondary line-through">
                      Rp 4.999.000
                    </span>
                  </div>
                  <span className="font-bold text-text-primary">
                    Rp 4.650.000
                  </span>
                </div>

                {/* Baris 2: Shopee (TERMURAH - Di-highlight) */}
                <div className="flex items-center justify-between p-3 rounded-lg border-2 border-primary-main bg-primary-light/10 relative">
                  <div className="absolute -left-2 -top-2 bg-primary-main text-primary-contrast text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                    TERMURAH
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#EE4D2D] flex items-center justify-center text-[10px] text-white font-bold">
                      S
                    </div>
                    <span className="text-sm font-medium text-text-secondary line-through">
                      Rp 4.999.000
                    </span>
                  </div>
                  <span className="font-black text-primary-main text-lg">
                    Rp 4.450.000
                  </span>
                </div>

                {/* Baris 3: Lazada */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-divider">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-[#0F146D] flex items-center justify-center text-[10px] text-white font-bold">
                      L
                    </div>
                    <span className="text-sm font-medium text-text-secondary">
                      Rp 4.600.000
                    </span>
                  </div>
                  <span className="font-bold text-text-primary">
                    Rp 4.600.000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM: QUICK ACCESS PILLS */}
      <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
        <span className="text-sm font-bold text-text-secondary whitespace-nowrap">
          Paling sering dicari:
        </span>
        <div className="flex gap-3 overflow-x-auto no-scrollbar w-full pb-2 sm:pb-0">
          {quickAccess.map((item) => (
            <Link
              href={`/search/${item.slug}`}
              key={item.name}
              className="flex items-center gap-2 bg-background-paper border border-divider hover:border-primary-main hover:text-primary-main px-4 py-2 rounded-full shrink-0 shadow-sm transition-colors cursor-pointer group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-sm font-bold">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
