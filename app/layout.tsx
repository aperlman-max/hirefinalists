import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hirefinalists.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HireFinalists — Vetted LATAM Contractors Who Already Cleared the Bar",
    template: "%s | HireFinalists",
  },
  description:
    "Hire pre-vetted contractors from Latin America — engineers, designers, marketers, sales, ops, finance, and more. Every candidate was an interview finalist at a real company. Skip screening, hire in days.",
  keywords: [
    "hire LATAM contractors",
    "Latin America remote talent",
    "vetted contractors",
    "hire Mexico developer",
    "hire Argentina developer",
    "hire Colombia developer",
    "remote LATAM hiring",
    "LATAM staffing",
    "nearshore contractors",
    "remote hiring marketplace",
  ],
  openGraph: {
    type: "website",
    siteName: "HireFinalists",
    title: "HireFinalists — Vetted LATAM Contractors",
    description:
      "Every contractor on HireFinalists was an interview finalist at a real company. Skip screening, hire in days, no placement fees.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireFinalists — Vetted LATAM Contractors",
    description:
      "Hire pre-vetted contractors from Latin America. Every candidate was an interview finalist. No screening, no placement fees.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-10 mt-20">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">HireFinalists</span>
            <span>© 2026 HireFinalists. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="/for-employers" className="hover:text-gray-900 transition-colors">For Employers</a>
              <a href="/apply" className="hover:text-gray-900 transition-colors">For Contractors</a>
              <a href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
