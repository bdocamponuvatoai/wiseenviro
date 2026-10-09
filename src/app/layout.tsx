import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";

import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Alabama Waste Collection & Portable Sanitation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#f7f9f3" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-foreground text-background sr-only z-50 rounded-md px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
