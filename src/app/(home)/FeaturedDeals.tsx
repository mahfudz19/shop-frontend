import { fetchDeals } from "@/lib/api";

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
        {deals.map((deal: any) => (
          <div
            key={deal.id}
            className="bg-background-paper rounded-md border border-divider p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
          >
            {/* Discount Badge Otomatis */}
            {deal.discount_percent > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-error-main text-error-contrast font-black text-xs px-2 py-1 rounded-sm">
                -{deal.discount_percent}%
              </div>
            )}

            <div className="h-48 bg-white border border-divider rounded-md mb-4 flex items-center justify-center overflow-hidden">
              <img
                src={deal.image_url}
                alt={deal.name}
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className="font-bold text-text-primary line-clamp-2 leading-snug group-hover:text-primary-main transition-colors text-sm">
              {deal.name}
            </h3>

            <div className="mt-4">
              {deal.price_original > deal.price_rp && (
                <span className="text-sm text-text-disabled line-through mr-2">
                  {formatRupiah(deal.price_original)}
                </span>
              )}
              <p className="text-xl font-black text-error-main">
                {formatRupiah(deal.price_rp)}
              </p>
            </div>

            <div className="mt-3 text-xs text-text-secondary flex items-center gap-2">
              <span className="bg-gray-100 px-2 py-1 rounded-sm font-semibold">
                {deal.marketplace}
              </span>
              <span className="truncate">{deal.shop}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
