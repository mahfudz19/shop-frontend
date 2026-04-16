import Header from "@/app/(Guest)/Header";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
