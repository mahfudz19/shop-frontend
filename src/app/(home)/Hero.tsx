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
      <div className="bg-[#FFEB3B] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden mb-8">
        <div className="z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 italic">
            Spring Deals
          </h2>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-6">
            Up to 50% off on your favorite items!
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-black shadow-lg hover:scale-105 transition-transform">
            Shop Now
          </button>
        </div>
        <div className="text-[150px] opacity-20 md:opacity-100 select-none">
          🛵
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar justify-start md:justify-center py-4">
        {quickAccess.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-3xl shadow-md group-hover:shadow-lg transition-all border border-gray-100">
              {item.icon}
            </div>
            <span className="text-xs font-bold text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
