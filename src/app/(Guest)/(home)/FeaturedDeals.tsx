import { fetchDeals } from "@/lib/api";
import Link from "next/link";
import { generateSlug } from "../product/[id]/page";
import Image from "@/components/Image";

export default async function FeaturedDeals() {
  const dealsRes = await fetchDeals();
  const deals = dealsRes.data || [];

  if (deals.length === 0) return null;

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };
  console.log("Fetched Deals:", deals);

  return (
    <section className="py-16 border-t border-divider/30 relative">
      {/* Background Accent - DNA: Modern Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-main/5 blur-[120px] pointer-events-none rounded-full"></div>

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-light/10 border border-error-light/20 text-error-main text-[10px] font-black uppercase tracking-[0.2em] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-error-main animate-pulse"></span>
            High_Priority_Deals
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter uppercase">
            Penawaran <span className="text-error-main">Terbaik</span>
          </h2>
          <p className="text-text-secondary text-sm mt-2 font-medium">
            Algoritma kami mendeteksi selisih harga terdalam di seluruh
            marketplace.
          </p>
        </div>
        <Link
          href="/search/deals"
          className="group flex items-center gap-2 text-primary-main font-black text-[10px] uppercase tracking-widest bg-primary-light/10 px-6 py-3 rounded-full border border-primary-light/20 hover:bg-primary-main hover:text-white transition-all"
        >
          Monitor Semua Penawaran{" "}
          <span className="text-lg group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>

      {/* DEALS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="group bg-background-paper border border-divider/50 rounded-2xl p-5 shadow-sm hover:shadow-2xl hover:border-primary-main/30 hover:-translate-y-2 transition-all duration-500 flex flex-col relative overflow-hidden"
          >
            {/* Discount Badge - DNA: Semantic Highlight */}
            {deal.discount_percent > 0 && (
              <div className="absolute top-4 left-4 z-20 bg-error-main text-white font-black text-[10px] px-3 py-1 rounded-full shadow-lg shadow-error-main/20 uppercase tracking-tighter">
                -{deal.discount_percent}% OFF
              </div>
            )}

            {/* Marketplace Badge */}
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-background-default/80 backdrop-blur-md border border-divider/50 text-[9px] font-black text-text-secondary px-2 py-0.5 rounded uppercase font-mono">
                {deal.marketplace}
              </span>
            </div>

            {/* Product Image Container */}
            <div className="h-52 bg-background-default rounded-xl mb-6 flex items-center justify-center overflow-hidden relative shadow-inner group-hover:bg-white transition-colors duration-500">
              <Image
                width={416}
                height={208}
                src={`${process.env.NEXT_IMAGES_HOSTNAME}/${deal.image_url}`}
                alt={deal.name}
                className="max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-main/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col">
              <span className="text-[9px] font-bold text-primary-main uppercase tracking-widest mb-2 font-mono">
                Code: {deal.id.substring(0, 8)}
              </span>
              <h3 className="font-bold text-text-primary text-sm line-clamp-2 leading-snug group-hover:text-primary-main transition-colors mb-4">
                {deal.name}
              </h3>

              <div className="mt-auto pt-4 border-t border-divider/30">
                <div className="flex items-baseline gap-2 mb-1">
                  {deal.price_original > deal.price_rp && (
                    <span className="text-[10px] text-text-disabled line-through font-mono">
                      {formatRupiah(deal.price_original)}
                    </span>
                  )}
                  <span className="text-[10px] font-black text-success-main bg-success-light/10 px-1.5 py-0.5 rounded-sm font-mono">
                    BEST_PRICE
                  </span>
                </div>
                <p className="text-xl font-black text-text-primary tracking-tighter font-mono">
                  {formatRupiah(deal.price_rp)}
                </p>
              </div>

              {/* Shop & Stats Footer */}
              <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-text-disabled uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {deal.location || "Unknown"}
                </span>
                <span className="bg-divider/40 px-2 py-0.5 rounded-sm">
                  {deal.sold_count > 0
                    ? `${deal.sold_count}+ Sold`
                    : "Fresh Data"}
                </span>
              </div>
            </div>

            {/* Action Overlay Button */}
            <Link
              href={generateSlug(deal.name, deal.id)}
              className="mt-5 w-full bg-text-primary text-background-paper py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest shadow-lg hover:bg-primary-main transition-all transform active:scale-95"
            >
              Analisis Lengkap &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
