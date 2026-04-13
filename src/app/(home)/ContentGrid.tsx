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
      <h2 className="text-2xl font-black mb-6 text-gray-900">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              📦
            </div>
            <span className="font-bold text-sm text-gray-800">{cat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MagazineSection() {
  return (
    <section className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-black mb-6 text-gray-900">
        {process.env.NEXT_PUBLIC_APP_NAME} Magazine
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-4">
              <div className="w-full h-full bg-slate-300 group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">
              Guide
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
              Best Smartphones of 2026: Which one is right for you?
            </h3>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2 italic">
              Discover the latest specs and price comparisons from top
              marketplaces...
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
