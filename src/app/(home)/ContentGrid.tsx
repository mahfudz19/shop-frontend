import Image from "@/components/Image";

export function CategoryGrid() {
  const categories = [
    "Sneakers",
    "Smartwatches",
    "Lego",
    "E-Bikes",
    "Perfumes",
    "Coffee Machines",
  ];
  return (
    <section className="py-12">
      <h2 className="text-2xl font-black mb-6 text-text-primary">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-background-paper p-6 rounded-md border border-divider shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              📦
            </div>
            <span className="font-bold text-sm text-text-primary">{cat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MagazineSection() {
  return (
    <section className="py-12 border-t border-divider">
      <h2 className="text-2xl font-black mb-6 text-text-primary">
        {process.env.NEXT_PUBLIC_APP_NAME} Magazine
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group cursor-pointer">
            <Image
              dummy
              containerClassName="aspect-video bg-background-default border border-divider rounded-md overflow-hidden mb-4"
              className="w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
            <span className="text-secondary-main font-bold text-xs uppercase tracking-widest">
              Guide
            </span>
            <h3 className="text-lg font-bold text-text-primary mt-2 line-clamp-2 leading-snug group-hover:text-primary-main transition-colors">
              Best Smartphones of 2026: Which one is right for you?
            </h3>
            <p className="text-sm text-text-secondary mt-2 line-clamp-2 italic">
              Discover the latest specs and price comparisons from top
              marketplaces...
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
