export default function Trust() {
  return (
    <section className="bg-primary-dark rounded-lg text-primary-contrast overflow-hidden mt-12 mb-12 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-divider">
          <h2 className="text-3xl font-black mb-4 leading-tight">
            Always have the best prices in your pocket
          </h2>
          <p className="opacity-80 mb-6 font-medium">
            Download the {process.env.NEXT_PUBLIC_APP_NAME} app and never miss a
            deal again.
          </p>
          <div className="flex gap-2 items-center">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="font-bold text-sm">(4.8/5)</span>
          </div>
        </div>

        <div className="p-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start">
            <span className="text-3xl">🛡️</span>
            <div>
              <h4 className="font-black mb-1">Safe & Trusted</h4>
              <p className="text-sm opacity-80 leading-snug">
                We only list verified stores.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-3xl">📉</span>
            <div>
              <h4 className="font-black mb-1">Price History</h4>
              <p className="text-sm opacity-80 leading-snug">
                Track price graphs for the last 90 days.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-3xl">📊</span>
            <div>
              <h4 className="font-black mb-1">350 Million+</h4>
              <p className="text-sm opacity-80 leading-snug">
                Offers from thousands of shops.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-3xl">✅</span>
            <div>
              <h4 className="font-black mb-1">Neutral</h4>
              <p className="text-sm opacity-80 leading-snug">
                Objective comparison without bias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
