import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col"
      suppressHydrationWarning
    >
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
