export default function Hero() {
  const quickAccess = [
    { name: "Gaming", icon: "🎮" },
    { name: "Sneakers", icon: "👟" },
    { name: "Smartphones", icon: "📱" },
    { name: "Televisions", icon: "📺" },
    { name: "Lego", icon: "🧱" },
    { name: "E-Bikes", icon: "🚲" },
  ];

  return (
    <section className="py-6">
      <div className="bg-warning-light text-warning-contrast rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden mb-8 shadow-sm">
        <div className="z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black mb-4 italic">
            Spring Deals
          </h2>
          <p className="text-lg md:text-xl font-bold opacity-90 mb-6">
            Up to 50% off on your favorite items!
          </p>
          <button className="bg-background-paper text-text-primary px-8 py-3 rounded-sm font-black shadow-sm hover:shadow-md transition-shadow">
            Shop Now
          </button>
        </div>
        <div className="text-[150px] opacity-20 md:opacity-40 select-none">
          🛵
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar justify-start md:justify-center py-4">
        {quickAccess.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-background-paper rounded-full flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-shadow border border-divider">
              {item.icon}
            </div>
            <span className="text-xs font-bold text-text-secondary">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
