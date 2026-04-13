import Header from "@/app/(home)/Header";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Search Page", href: "" },
        ]}
      />
      {/* Container utama untuk membatasi lebar agar tidak melebar penuh seperti di screenshot */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
