import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import LenisScrollProvider from "./providers/lenis-provider";

const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Extralight.otf", weight: "200", style: "normal" },
    { path: "./fonts/ClashDisplay-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/ClashDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.otf", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: {
    default: "KINZ - Le Jeu de Cartes",
    template: "%s | KINZ"
  },
  description: "Découvrez KINZ, le jeu de cartes rapide et convivial dans lequel attendre 15 n'a jamais été aussi important !",
  keywords: ["jeu de cartes", "KINZ", "stratégie", "jeu de société", "cartes", "jeu rapide", "jeu simple"],
  authors: [{ name: "Virgile Marty" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'KINZ',
    title: 'KINZ - Le Jeu de Cartes',
    description: "Découvrez KINZ, le jeu de cartes rapide et convivial dans lequel attendre 15 n'a jamais été aussi important !",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${clashDisplay.variable} font-sans antialiased`}>
        <LenisScrollProvider>
          {children}
        </LenisScrollProvider>
      </body>
    </html>
  );
}
