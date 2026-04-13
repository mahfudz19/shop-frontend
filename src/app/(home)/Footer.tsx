export default function Footer() {
  return (
    <footer className="bg-background-paper border-t border-divider pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight text-text-primary">
            About {process.env.NEXT_PUBLIC_APP_NAME}
          </h3>
          <ul className="space-y-3 text-sm text-text-secondary font-medium">
            <li className="hover:text-primary-main transition cursor-pointer">
              Press
            </li>
            <li className="hover:text-primary-main transition cursor-pointer">
              Jobs
            </li>
            <li className="hover:text-primary-main transition cursor-pointer">
              Partner Program
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight text-text-primary">
            Help
          </h3>
          <ul className="space-y-3 text-sm text-text-secondary font-medium">
            <li className="hover:text-primary-main transition cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-primary-main transition cursor-pointer">
              FAQ
            </li>
            <li className="hover:text-primary-main transition cursor-pointer">
              Sitemap
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight text-text-primary">
            Social Media
          </h3>
          <div className="flex gap-4 text-2xl">
            <span className="cursor-pointer hover:scale-110 transition-transform">
              📘
            </span>
            <span className="cursor-pointer hover:scale-110 transition-transform">
              🐦
            </span>
            <span className="cursor-pointer hover:scale-110 transition-transform">
              📸
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-black text-lg mb-6 tracking-tight text-text-primary">
            App
          </h3>
          <p className="text-sm text-text-secondary italic">
            Available on Google Play & App Store
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-divider flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-text-disabled font-bold tracking-widest">
          © 2026 {process.env.NEXT_PUBLIC_APP_NAME} INC
        </p>
        <div className="flex gap-6 text-xs text-text-disabled font-bold">
          <span className="hover:text-primary-main cursor-pointer transition">
            Imprint
          </span>
          <span className="hover:text-primary-main cursor-pointer transition">
            Privacy Policy
          </span>
          <span className="hover:text-primary-main cursor-pointer transition">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
