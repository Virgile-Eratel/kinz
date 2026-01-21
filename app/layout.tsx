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
  metadataBase: new URL('https://kinz-cards.com'),
  title: {
    default: "KINZ - Le Jeu de Cartes Stratégique",
    template: "%s | KINZ"
  },
  description: "Découvrez KINZ, le jeu de cartes stratégique qui mêle bluff, tactique et adrénaline. Affrontez vos amis dans des parties intenses.",
  keywords: ["jeu de cartes", "KINZ", "stratégie", "bluff", "jeu de société", "cartes", "jeu tactique"],
  authors: [{ name: "KINZ Team" }],
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
    url: 'https://kinz-cards.com',
    siteName: 'KINZ',
    title: 'KINZ - Le Jeu de Cartes Stratégique',
    description: 'Découvrez KINZ, le jeu de cartes stratégique qui mêle bluff, tactique et adrénaline.',
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
