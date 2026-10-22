import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas-neue", display: "swap" });

const description =
  "Arlow designs calm, made-to-order furniture and objects in solid oak, ash and walnut. Built by hand, finished in natural oils, made to last.";

// Absolute base for Open Graph URLs: an explicit site URL, else the Vercel production domain, else local dev.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arlow | Quiet, Handmade Solid Wood Furniture",
    template: "%s | Arlow",
  },
  description,
  openGraph: {
    title: "Arlow | Quiet, Handmade Solid Wood Furniture",
    description,
    images: ["/images/brand/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ef",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${bebasNeue.variable}`}>
      <body>
        <noscript>
          <style>{`.blur-text-char{opacity:1!important;animation:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
