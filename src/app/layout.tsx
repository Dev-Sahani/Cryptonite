import Sidebar from "@/components/Sidebar";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-primary">
        <div className="min-h-dvh flex">
          <Sidebar className="py-10" />
          <div className="w-full min-h-dvh">
            {/* <Navbar /> */}
            <main className="px-10">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
