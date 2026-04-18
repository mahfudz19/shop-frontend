"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

function SubHeader() {
  const segments = useSelectedLayoutSegments();

  const mainCategories = [
    "Auto & Motorcycle",
    "Baby & Kids",
    "Hardware Store",
    "Clothing",
    "Electronics",
    "Garden",
    "Health",
    "Home & Kitchen",
  ];

  const breadcrumbs = segments.map((segment) => {
    const decoded = decodeURIComponent(segment);
    if (decoded.length > 20) return decoded.slice(0, 17) + "...";
    return decoded;
  });

  return (
    <>
      {breadcrumbs[0] !== "(home)" ? (
        <nav className="relative z-10 bg-background-default/90 backdrop-blur-md border-b border-divider/30 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
            <Link
              href="/"
              className="text-text-disabled hover:text-primary-main transition-colors shrink-0"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <span className="text-text-disabled/50">/</span>
                {idx + 1 !== breadcrumbs.length ? (
                  <Link
                    href={"/" + crumb}
                    className="text-text-disabled hover:text-primary-main transition-colors"
                  >
                    {crumb} {idx + 1 === breadcrumbs.length}
                  </Link>
                ) : (
                  <span className="text-text-secondary underline-offset-4 decoration-2">
                    {crumb}
                  </span>
                )}
              </div>
            ))}
          </div>
        </nav>
      ) : (
        <div className="relative z-10 bg-background-paper/50 backdrop-blur-md border-b border-divider/30">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar gap-8 h-11 items-center">
            {mainCategories.map((cat) => (
              <Link
                key={cat}
                href={`/search/${cat}`}
                className="text-[10px] md:text-[11px] font-black text-text-secondary hover:text-primary-main uppercase tracking-[0.15em] transition-all whitespace-nowrap relative group py-1"
              >
                {cat}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-main transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SubHeader;
