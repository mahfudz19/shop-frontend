import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background-default min-h-screen flex flex-col font-mono">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
