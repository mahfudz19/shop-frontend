export default function Footer() {
  return (
    <footer className="bg-background-paper border-t-2 border-divider pt-16 pb-8 mt-auto font-mono">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col mb-6">
            <span className="text-[10px] font-black text-primary-main uppercase tracking-[0.3em] leading-none mb-1">
              SYSTEM_INFO
            </span>
            <h3 className="font-black text-lg tracking-tighter text-text-primary uppercase">
              About {process.env.NEXT_PUBLIC_APP_NAME}
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-text-secondary font-medium uppercase">
            <li className="hover:text-primary-main transition cursor-pointer flex items-center gap-2">
              <span className="text-[8px] opacity-50">01_</span> Press
            </li>
            <li className="hover:text-primary-main transition cursor-pointer flex items-center gap-2">
              <span className="text-[8px] opacity-50">02_</span> Jobs
            </li>
            <li className="hover:text-primary-main transition cursor-pointer flex items-center gap-2">
              <span className="text-[8px] opacity-50">03_</span> Partner Program
            </li>
          </ul>
        </div>

        <div>
          <div className="flex flex-col mb-6">
            <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.3em] leading-none mb-1">
              SUPPORT_CENTER
            </span>
            <h3 className="font-black text-lg tracking-tighter text-text-primary uppercase">
              Help
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-text-secondary font-medium uppercase">
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
          <div className="flex flex-col mb-6">
            <span className="text-[10px] font-black text-text-disabled uppercase tracking-[0.3em] leading-none mb-1">
              SOCIAL_FEED
            </span>
            <h3 className="font-black text-lg tracking-tighter text-text-primary uppercase">
              Connect
            </h3>
          </div>
          <div className="flex gap-4 text-xl grayscale hover:grayscale-0 transition-all">
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

        <div className="bg-divider/10 p-6 border-l-2 border-primary-main">
          <div className="flex flex-col mb-4">
            <span className="text-[10px] font-black text-success-main uppercase tracking-[0.3em] leading-none mb-1">
              PLATFORM_STATUS
            </span>
            <h3 className="font-black text-lg tracking-tighter text-text-primary uppercase">
              App
            </h3>
          </div>
          <p className="text-[10px] text-text-secondary leading-tight uppercase font-bold">
            [ READY ] Google Play
            <br />[ READY ] App Store
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-divider/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success-main animate-pulse"></div>
          <p className="text-[10px] text-text-disabled font-bold tracking-widest">
            © 2026 {process.env.NEXT_PUBLIC_APP_NAME} INC // ALL_RIGHTS_RESERVED
          </p>
        </div>

        <div className="flex gap-6 text-[9px] text-text-disabled font-bold uppercase tracking-tighter">
          <span className="hover:text-primary-main cursor-pointer transition">
            [ Imprint ]
          </span>
          <span className="hover:text-primary-main cursor-pointer transition">
            [ Privacy Policy ]
          </span>
          <span className="hover:text-primary-main cursor-pointer transition">
            [ Terms of Service ]
          </span>
        </div>
      </div>
    </footer>
  );
}
