export default function Trust() {
  return (
    <section className="bg-[#002B5B] rounded-2xl text-white overflow-hidden mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* App Promotion */}
        <div className="p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-blue-900">
          <h2 className="text-3xl font-black mb-4 leading-tight">
            Selalu Bawa Harga Termurah di Saku Anda
          </h2>
          <p className="text-blue-200 mb-6 font-medium">
            Download aplikasi {process.env.NEXT_PUBLIC_APP_NAME} dan jangan
            pernah lewatkan diskon lagi.
          </p>
          <div className="flex gap-2 items-center">
            <span className="text-2xl">⭐⭐⭐⭐⭐</span>
            <span className="font-bold text-sm">(4.8/5)</span>
          </div>
        </div>

        {/* USP Grid */}
        <div className="p-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start">
            <span className="text-3xl">🛡️</span>
            <div>
              <h4 className="font-black mb-1">Aman & Terpercaya</h4>
              <p className="text-sm text-blue-200 leading-snug">
                Hanya menampilkan toko terverifikasi.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-3xl">📉</span>
            <div>
              <h4 className="font-black mb-1">Riwayat Harga</h4>
              <p className="text-sm text-blue-200 leading-snug">
                Pantau grafik harga 90 hari terakhir.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-3xl">📊</span>
            <div>
              <h4 className="font-black mb-1">350 Juta+</h4>
              <p className="text-sm text-blue-200 leading-snug">
                Penawaran dari ribuan marketplace.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <span className="text-3xl">✅</span>
            <div>
              <h4 className="font-black mb-1">Netral</h4>
              <p className="text-sm text-blue-200 leading-snug">
                Perbandingan objektif tanpa bias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
