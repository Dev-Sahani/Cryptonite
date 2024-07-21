import Sidebar from "@/components/Sidebar";
import "./globals.css";
import MobileNav from "@/components/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-primary">
        <div className="min-h-dvh flex flex-col md:flex-row">
          <Sidebar className="py-10 hidden md:block" />
          <MobileNav className="block md:hidden" />
          <div className="w-full min-h-dvh">
            {/* <Navbar /> */}
            <main className="px-4 md:px-8 lg:px-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
