import React from "react";
import Image from "@/components/Image";
import Link from "next/link";
import Ripple from "@/components/ui/Ripple";

// DATA DUMMY UNTUK INTEGRASI API MENDATANG
const DUMMY_CART_ITEMS = [
  {
    id: "node_771x",
    product_id: "p_101",
    name: "Industrial Mechanical Keyboard X1",
    image_url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300&h=300&fit=crop",
    marketplace: "Tokopedia",
    shop: "Mechanical Hub",
    price_rp: 1250000,
    price_original: 1450000,
    quantity: 1,
    is_best_price: true,
  },
  {
    id: "node_882y",
    product_id: "p_202",
    name: "Studio Monitoring Headphones",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    marketplace: "Shopee",
    shop: "Audio Pro Store",
    price_rp: 2450000,
    price_original: 2450000,
    quantity: 1,
    is_best_price: false,
  },
];

const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

function Cart() {
  const subtotal = DUMMY_CART_ITEMS.reduce((acc, item) => acc + item.price_rp * item.quantity, 0);
  const totalSavings = DUMMY_CART_ITEMS.reduce((acc, item) => acc + (item.price_original - item.price_rp) * item.quantity, 0);
  const platformFee = 2000;
  const grandTotal = subtotal + platformFee;

  if (DUMMY_CART_ITEMS.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-background-paper border border-divider rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm">
          📦
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter text-text-primary mb-2">
          SCAN_RESULT: EMPTY
        </h1>
        <p className="text-sm text-text-secondary mb-8 opacity-70">
          Tidak ada data item yang ditemukan dalam node keranjang Anda saat ini.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-8 py-3 bg-primary-main text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Mulai Eksplorasi
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-divider/50">
        <div>
          <span className="text-[10px] font-black text-primary-main uppercase tracking-[0.4em] mb-2 block">
            DATA_SYNCHRONIZATION
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter uppercase">
            Keranjang <span className="text-primary-main">Sistem</span>
          </h1>
        </div>
        <div className="bg-background-paper px-4 py-2 rounded-full border border-divider text-[10px] font-black text-text-disabled uppercase tracking-widest shadow-sm">
           Nodes_Active: {DUMMY_CART_ITEMS.length} Units
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ======================================================== */}
        {/* SISI KIRI: LIST ITEM (8 COL)                             */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-4 mb-4">
             <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em]">ITEM_MATRIX_SPEC</span>
             <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.2em]">PRICE_DATA</span>
          </div>

          {DUMMY_CART_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="group bg-background-paper border border-divider rounded-[2rem] p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 hover:border-primary-main/30 hover:shadow-xl hover:shadow-primary-main/5 transition-all relative overflow-hidden"
            >
              {/* Image & Best Price Badge */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-2xl overflow-hidden bg-background-default border border-divider/50">
                <Image 
                  src={item.image_url} 
                  alt={item.name} 
                  width={150} 
                  height={150} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.is_best_price && (
                  <div className="absolute top-1 left-1">
                    <span className="bg-success-main text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm animate-pulse">
                      BEST_VALUE
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <span className={`px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-widest ${
                     item.marketplace === 'Shopee' ? 'bg-[#EE4D2D]' : 'bg-[#42B549]'
                   }`}>
                     {item.marketplace}
                   </span>
                   <span className="text-[9px] font-bold text-text-disabled uppercase tracking-wider">{item.shop}</span>
                </div>
                <h3 className="text-lg font-black text-text-primary tracking-tight mb-4 group-hover:text-primary-main transition-colors">
                  {item.name}
                </h3>
                
                {/* Quantity Mobile Control Placeholder */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                   <div className="flex items-center bg-background-default border border-divider rounded-xl overflow-hidden">
                      <button className="px-3 py-1 text-text-secondary hover:bg-divider transition-colors border-r border-divider text-xs">-</button>
                      <span className="px-4 py-1 text-xs font-black font-mono">{item.quantity}</span>
                      <button className="px-3 py-1 text-text-secondary hover:bg-divider transition-colors border-l border-divider text-xs">+</button>
                   </div>
                   <button className="text-[10px] font-black text-error-main uppercase tracking-widest hover:underline">Remove</button>
                </div>
              </div>

              {/* Price Area */}
              <div className="text-center md:text-right shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-divider/40 md:pl-8 w-full md:w-auto">
                {item.price_original > item.price_rp && (
                  <p className="text-[10px] text-text-disabled line-through font-mono">
                    {formatRupiah(item.price_original)}
                  </p>
                )}
                <p className="text-2xl font-black text-text-primary tracking-tighter font-mono leading-none">
                  {formatRupiah(item.price_rp)}
                </p>
                <p className="text-[9px] font-bold text-text-disabled uppercase tracking-widest mt-1">UNIT_PRICE_OK</p>
              </div>

              {/* Background Accent Decorative */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-main/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* SISI KANAN: SUMMARY (4 COL)                              */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-background-paper border border-divider rounded-[2.5rem] p-8 shadow-xl shadow-primary-main/5 relative overflow-hidden">
               {/* Decorative Blur */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

               <h2 className="text-[10px] font-black text-text-disabled uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-primary-main animate-ping" />
                 EXECUTION_SUMMARY
               </h2>

               <div className="space-y-4 mb-8">
                 <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-text-secondary uppercase tracking-tight">SUBTOTAL_EST</span>
                    <span className="font-black font-mono text-text-primary">{formatRupiah(subtotal)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-text-secondary uppercase tracking-tight">PLATFORM_FEE</span>
                    <span className="font-black font-mono text-text-primary">{formatRupiah(platformFee)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm pt-4 border-t border-divider/50">
                    <span className="font-bold text-text-disabled uppercase tracking-tight italic">TOTAL_SAVINGS</span>
                    <span className="font-black font-mono text-success-main">-{formatRupiah(totalSavings)}</span>
                 </div>
               </div>

               <div className="mb-8 p-4 bg-background-default border border-divider rounded-2xl">
                  <span className="block text-[9px] font-black text-text-disabled uppercase tracking-widest mb-1">FINAL_GRAND_TOTAL</span>
                  <div className="text-3xl font-black text-text-primary tracking-tighter font-mono">
                    {formatRupiah(grandTotal)}
                  </div>
               </div>

               <button className="relative w-full py-5 bg-primary-main text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary-main/20 hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden">
                  <Ripple />
                  PROCEED_TO_CHECKOUT
               </button>
            </div>

            {/* Hint Box */}
            <div className="p-6 bg-linear-to-br from-success-light/5 to-transparent border border-success-main/20 rounded-[2rem] flex items-start gap-4">
               <span className="text-xl">✨</span>
               <p className="text-[11px] leading-relaxed text-text-secondary font-medium">
                 <strong className="text-success-main font-black uppercase">Sistem Berhasil!</strong> Anda menghemat <span className="font-black">{formatRupiah(totalSavings)}</span> dengan menggunakan mesin pembanding harga ScrapStore.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
