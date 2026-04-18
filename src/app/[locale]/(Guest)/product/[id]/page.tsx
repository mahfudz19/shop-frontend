import Image from "@/components/Image";
import Ripple from "@/components/ui/Ripple";
import { fetchMasterProductById, fetchProductById } from "@/lib/api";
import Link from "next/link";

export const generateSlug = (name: string, id: string) => {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
  return `/product/${cleanName}~${id}`;
};

export const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function Product(props: Props) {
  const params = await props.params;

  const fullSlug = decodeURIComponent(params.id);
  const productId = fullSlug.split("~").pop();

  // 1. Fetch raw product untuk mendapatkan master_product_id
  const productData = await fetchProductById(productId!);
  if (
    !productData ||
    !productData.data?.product.id ||
    !productData.data?.product.master_product_id
  ) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-text-secondary font-mono">
        <span className="text-6xl mb-4">📡</span>
        <h1 className="text-xl font-black uppercase tracking-widest mb-2">
          404_Not_Found
        </h1>
        <p className="text-sm">
          Signal lost. Product data is unavailable in the current matrix.
        </p>
      </div>
    );
  }

  // 2. Fetch data gabungan (Master + Offers) dari endpoint baru
  const masterResponse = await fetchMasterProductById(
    productData.data.product.master_product_id,
  );
  const master = masterResponse?.data;

  if (!master) {
    return (
      <div className="text-center py-20 font-mono">
        SYSTEM_ERROR: Failed to load Master Catalog.
      </div>
    );
  }

  // Ekstraksi data dari API Go
  const offers = master.offers || [];
  const bestOffer = offers.length > 0 ? offers[0] : null; // Karena di Go kita sort ASC by price_rp
  const totalOffers = master.total_offers || 0;
  const savings = master.savings || 0;
  const specifications = master.specifications || {};

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* ======================================================== */}
      {/* SISI KIRI: VISUAL & SPECS (5 COL)                        */}
      {/* ======================================================== */}
      <div className="lg:col-span-5 space-y-6">
        <div className="aspect-square rounded-3xl bg-background-paper border border-divider overflow-hidden relative shadow-xl shadow-primary-main/5 p-4 flex items-center justify-center group">
          {/* Fallback ke gambar offer terbaik jika master.default_image kosong */}
          <Image
            src={`${process.env.NEXT_IMAGES_HOSTNAME}/${productData.data.product.image_url}`}
            width={950}
            height={950}
            alt={master.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-background-paper/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black border border-divider uppercase tracking-widest shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success-main animate-pulse"></span>
              Live_Scan_OK
            </span>
          </div>
        </div>

        <div className="p-6 bg-background-paper border border-divider rounded-2xl shadow-sm">
          <h2 className="text-xs font-black text-text-disabled uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="text-primary-main">⚙️</span> System_Parameters
          </h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 font-mono text-[11px]">
            <div className="flex flex-col gap-1">
              <span className="text-text-disabled">BRAND</span>
              <span className="text-text-primary font-bold uppercase">
                {master.brand || "GENERIC"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-disabled">MODEL</span>
              <span className="text-text-primary font-bold uppercase">
                {master.model || "N/A"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-disabled">DATA_SOURCES</span>
              <span className="text-text-primary font-bold">
                {totalOffers} Verified Nodes
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-disabled">BASELINE_MIN</span>
              <span className="text-text-primary font-bold">
                {formatRupiah(master.baseline_price_min)}
              </span>
            </div>

            {/* Loop sisa spesifikasi dinamis jika ada */}
            {Object.entries(specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col gap-1 col-span-2 border-t border-divider/50 pt-2"
              >
                <span className="text-text-disabled uppercase">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-text-primary font-bold">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SISI KANAN: ANALYTIC DASHBOARD (7 COL)                   */}
      {/* ======================================================== */}
      <div className="lg:col-span-7 flex flex-col">
        {/* 1. Header Produk */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary leading-[1.1] mb-4 tracking-tighter">
            {master.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-1.5 bg-background-paper border border-divider px-3 py-1 rounded-full shadow-sm">
              <span className="text-lg">⭐</span>
              <span className="font-mono font-black text-sm">4.8</span>
              <span className="text-[9px] text-text-disabled uppercase font-bold tracking-widest ml-1">
                Avg_Score
              </span>
            </div>
            {bestOffer && (
              <div className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
                {bestOffer.sold_count}+{" "}
                <span className="text-text-disabled">Units_Decoded</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. THE SYSTEM VERDICT BAR */}
        {offers.length > 0 ? (
          <div className="bg-linear-to-br from-primary-main to-primary-dark rounded-2xl p-6 md:p-8 text-primary-contrast shadow-xl shadow-primary-main/20 relative overflow-hidden mb-8 transform transition-transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div>
                <span className="inline-block bg-white/20 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.3em] mb-3">
                  &gt;&gt; Engine_Verdict
                </span>
                <p className="text-xl md:text-2xl font-medium leading-tight">
                  Eksekusi di{" "}
                  <span className="font-black underline decoration-4 underline-offset-4">
                    {bestOffer.marketplace}
                  </span>
                  .
                </p>
              </div>
              <div className="text-left md:text-right w-full md:w-auto border-t border-white/20 md:border-none pt-4 md:pt-0">
                <p className="text-[10px] font-bold uppercase opacity-80 mb-1 tracking-widest">
                  {savings > 0 ? "Potensi_Hemat" : "Harga_Terbaik"}
                </p>
                <p className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
                  {formatRupiah(bestOffer.price_rp)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-error-light/10 border border-error-main/30 rounded-2xl p-6 mb-8 text-center">
            <span className="text-error-main text-2xl mb-2 block">⚠️</span>
            <p className="font-mono text-sm font-bold text-error-main uppercase tracking-widest">
              No_Active_Offers_Detected
            </p>
          </div>
        )}

        {/* 3. PRICE MATRIX (COMPARISON TABLE) */}
        <div className="space-y-4 mb-8">
          <h3 className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em] px-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-main animate-ping"></span>
            Matrix_Perbandingan_Harga
          </h3>

          <div className="bg-background-paper border border-divider rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-divider/50">
              {offers.map((offer: any, idx: number) => {
                const isBest = idx === 0; // Karena API Go sudah menyortir ASC
                return (
                  <div
                    key={offer.id}
                    className={`p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-divider/5 ${isBest ? "bg-success-light/5 relative" : ""}`}
                  >
                    {/* Indikator Pemenang */}
                    {isBest && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-success-main"></div>
                    )}

                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shrink-0 shadow-sm ${
                          offer.marketplace.toLowerCase() === "shopee"
                            ? "bg-[#EE4D2D]"
                            : offer.marketplace.toLowerCase() === "tokopedia"
                              ? "bg-[#42B549]"
                              : offer.marketplace.toLowerCase() === "lazada"
                                ? "bg-[#0F146D]"
                                : "bg-gray-800"
                        }`}
                      >
                        {offer.marketplace[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-sm uppercase tracking-tight text-text-primary">
                            {offer.marketplace}
                          </span>
                          {isBest && (
                            <span className="bg-success-main text-white text-[9px] px-1.5 py-0.5 rounded font-black font-mono tracking-widest uppercase">
                              Best_Value
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary font-medium">
                          {offer.shop}{" "}
                          <span className="opacity-50 mx-1">•</span>{" "}
                          <span className="uppercase text-[10px] tracking-wider">
                            {offer.location}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8 mt-2 md:mt-0">
                      <div className="text-left md:text-right">
                        {offer.price_original > offer.price_rp && (
                          <p className="text-[10px] text-text-disabled line-through font-mono mb-0.5">
                            {formatRupiah(offer.price_original)}
                          </p>
                        )}
                        <p
                          className={`text-xl md:text-2xl font-black font-mono tracking-tighter leading-none ${isBest ? "text-success-main" : "text-text-primary"}`}
                        >
                          {formatRupiah(offer.price_rp)}
                        </p>
                      </div>

                      <Link
                        href={offer.url || offer.clean_url || "#"}
                        target="_blank"
                        className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 ${
                          isBest
                            ? "bg-primary-main text-white shadow-lg shadow-primary-main/20 hover:-translate-y-0.5"
                            : "bg-background-default text-text-secondary border border-divider hover:border-primary-main hover:text-primary-main"
                        }`}
                      >
                        <Ripple color={isBest ? undefined : "primary"} />
                        {isBest ? "Eksekusi" : "Visit"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. MOCKUP SYSTEM ALERT (Bawah) */}
        <div className="mt-auto flex items-start gap-3 p-4 border border-divider/50 rounded-xl bg-background-default/50 text-text-secondary text-[10px] font-mono leading-relaxed">
          <span className="text-lg leading-none mt-0.5">💡</span>
          <p>
            <strong className="text-text-primary">DISCLAIMER_ENGINE:</strong>{" "}
            Harga dan ketersediaan stok dapat berubah sewaktu-waktu sesuai
            dengan kebijakan platform{" "}
            <span className="uppercase">
              {bestOffer?.marketplace || "marketplace"}
            </span>
            . Sistem kami melakukan sinkronisasi secara berkala, namun kami
            menyarankan untuk memeriksa ulang sebelum melakukan pembayaran.
          </p>
        </div>
      </div>
    </div>
  );
}
