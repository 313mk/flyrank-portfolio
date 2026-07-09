import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Kamran - Resilient Frontend AI Portfolio",
  description: "Production-grade Frontend AI solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8fafc] text-[#0f172a] min-h-screen flex flex-col`}>
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-[#0f172a] text-lg">MK.</Link>
            <div className="flex gap-6 items-center">
              <Link href="/case-study" className="text-slate-600 hover:text-[#0f172a] text-sm">Projects</Link>
              <Link href="/health" className="text-slate-600 hover:text-[#0f172a] text-sm">Health-Check</Link>
              <Link href="/contact" className="bg-[#0d9488] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-teal-700 transition">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}