import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EmergencyBar from "@/components/layout/EmergencyBar";
import FloatingActions from "@/components/layout/FloatingActions";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rahgosha.top";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ره گشا | خدمات تخصصی لوله بازکنی، تخلیه چاه و حفر چاه",
    template: "%s | ره گشا",
  },
  description:
    "شرکت خدمات فنی ره گشا: لوله بازکنی، تخلیه چاه، حفر چاه، لایروبی، رفع ترکیدگی لوله و خدمات اضطراری لوله‌کشی در تهران و کرج. پاسخگویی ۲۴ ساعته.",
  keywords: [
    "لوله بازکنی فوری",
    "تخلیه چاه",
    "حفر چاه",
    "لوله کشی",
    "لایروبی چاه",
    "رفع گرفتگی فاضلاب",
  ],
  openGraph: {
    title: "ره گشا | خدمات تخصصی لوله بازکنی و تخلیه چاه",
    description:
      "خدمات فنی تخصصی و اضطراری لوله بازکنی، تخلیه و حفر چاه با پاسخگویی ۲۴ ساعته.",
    url: siteUrl,
    siteName: "ره گشا",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ره گشا | خدمات تخصصی لوله بازکنی و تخلیه چاه",
    description: "پاسخگویی ۲۴ ساعته، تشخیص دقیق، اجرای تخصصی.",
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.json",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ره گشا",
  image: `${siteUrl}/og-cover.jpg`,
  url: siteUrl,
  telephone: process.env.NEXT_PUBLIC_PHONE_EMERGENCY,
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressCountry: "IR",
  },
  openingHours: "Mo-Su 00:00-24:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <EmergencyBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
