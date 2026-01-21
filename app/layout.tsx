import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google';
 
const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
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
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
