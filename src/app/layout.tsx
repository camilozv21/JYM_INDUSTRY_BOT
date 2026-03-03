import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jym-industry-bot.com"),
  title: {
    default: "J&M Industry Bot - Automatización Inteligente",
    template: "%s | J&M Industry Bot",
  },
  description: "Optimiza tus procesos y toma el control con la nueva generación de automatización y gestión inteligente de J&M Industry.",
  keywords: ["automatización", "bot", "industria", "gestión", "inteligencia artificial", "procesos", "j&m industry"],
  authors: [{ name: "J&M Industry Team" }],
  creator: "J&M Industry",
  publisher: "J&M Industry",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://jym-industry-bot.com",
    title: "J&M Industry Bot - Automatización Inteligente",
    description: "Optimiza tus procesos y toma el control con la nueva generación de automatización y gestión inteligente.",
    siteName: "J&M Industry Bot",
  },
  twitter: {
    card: "summary_large_image",
    title: "J&M Industry Bot - Automatización Inteligente",
    description: "Optimiza tus procesos y toma el control con la nueva generación de automatización y gestión inteligente.",
    creator: "@jymindustry", 
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
