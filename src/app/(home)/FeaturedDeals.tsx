import Image from "@/components/Image";

export default function FeaturedDeals() {
  const deals = [
    {
      id: 1,
      name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
      price: 4500000,
      oldPrice: 5999000,
      shop: "Sony Official Store",
      image: "🎧",
    },
    {
      id: 2,
      name: "Apple MacBook Air M2 256GB - Space Gray",
      price: 15499000,
      oldPrice: 17999000,
      shop: "iBox Indonesia",
      image: "💻",
    },
    {
      id: 3,
      name: "Xiaomi Robot Vacuum E10 Tampilan Cerdas",
      price: 2100000,
      oldPrice: 3500000,
      shop: "Xiaomi Store",
      image: "🤖",
    },
    {
      id: 4,
      name: "Nike Air Force 1 '07 Original Men's Sneakers",
      price: 1549000,
      oldPrice: 1999000,
      shop: "Nike Flagship",
      image: "👟",
    },
  ];

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-12 border-t border-divider">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-text-primary">
            Featured Deals
          </h2>
          <p className="text-text-secondary mt-1">
            Handpicked discounts from top marketplaces.
          </p>
        </div>
        <button className="text-primary-main font-bold hover:underline text-sm hidden sm:block">
          View All Deals &rarr;
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="bg-background-paper rounded-md border border-divider p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
          >
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-10 bg-error-main text-error-contrast font-black text-xs px-2 py-1 rounded-sm">
              -
              {Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100)}
              %
            </div>

            <Image
              dummy
              containerClassName="h-48 bg-background-default border border-divider rounded-md mb-4 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform duration-500"
            />

            <h3 className="font-bold text-text-primary line-clamp-2 leading-snug group-hover:text-primary-main transition-colors">
              {deal.name}
            </h3>

            <div className="mt-4">
              <span className="text-sm text-text-disabled line-through mr-2">
                {formatRupiah(deal.oldPrice)}
              </span>
              <p className="text-xl font-black text-error-main">
                {formatRupiah(deal.price)}
              </p>
            </div>

            <div className="mt-3 text-xs text-text-secondary flex items-center gap-2">
              <span>🏪</span> {deal.shop}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
