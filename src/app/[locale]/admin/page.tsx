export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <p className="text-gray-600">
          Halaman ini otomatis terproteksi oleh Middleware. Hanya user dengan
          cookie valid yang bisa melihat ini.
        </p>
        {/* Nanti di sini Anda bisa meletakkan tabel produk, form edit harga, dll */}
      </div>
    </div>
  );
}
