export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight">
            About {process.env.NEXT_PUBLIC_APP_NAME}
          </h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="hover:text-white transition cursor-pointer">
              Press
            </li>
            <li className="hover:text-white transition cursor-pointer">Jobs</li>
            <li className="hover:text-white transition cursor-pointer">
              Partner Program
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight">Help</h3>
          <ul className="space-y-3 text-sm text-gray-400 font-medium">
            <li className="hover:text-white transition cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-white transition cursor-pointer">FAQ</li>
            <li className="hover:text-white transition cursor-pointer">
              Sitemap
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight">
            Social Media
          </h3>
          <div className="flex gap-4 text-2xl">
            <span>📘</span> <span>🐦</span> <span>📸</span>
          </div>
        </div>
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight">App</h3>
          <p className="text-sm text-gray-400 italic">
            Available on Google Play & App Store
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 font-bold tracking-widest">
          © 2026 {process.env.NEXT_PUBLIC_APP_NAME} INC
        </p>
        <div className="flex gap-6 text-xs text-gray-500 font-bold">
          <span className="hover:text-white cursor-pointer transition">
            Imprint
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
