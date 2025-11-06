import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "./components/TransitionProvider";
import { AudioProvider } from "./components/AudioProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍ | Tangfong & Sreyren",
  description: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស សំណាង តាំងហ្វុង និង កូនស្រី ង៉ិន ស្រីរ៉េន នៅថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥",
  keywords: ["Wedding Invitation", "សិរីមង្គលអាពាហ៍ពិពាហ៍", "Samnang Tangfong", "Ngin Sreyren", "Tangfong", "Sreyren", "Cambodia Wedding", "Khmer Wedding"],
  authors: [{ name: "Tangfong & Sreyren" }],
  creator: "Tangfong & Sreyren",
  publisher: "Wedding Invitation",
  metadataBase: new URL('https://wedding.nasfong.site'),
  openGraph: {
    title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍",
    description: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស សំណាង តាំងហ្វុង និង កូនស្រី ង៉ិន ស្រីរ៉េន",
    siteName: 'Wedding Invitation - Tangfong & Sreyren',
    images: [
      {
        url: 'https://wedding.nasfong.site/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Invitation - Samnang Tangfong & Ngin Sreyren',
        type: 'image/jpeg',
      },
    ],
    locale: 'km_KH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍",
    description: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍",
    images: ['https://wedding.nasfong.site/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        {/* Explicit Open Graph tags for Facebook/Messenger */}
        <meta property="og:title" content="Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍" />
        <meta property="og:description" content="យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស សំណាង តាំងហ្វុង និង កូនស្រី ង៉ិន ស្រីរ៉េន" />
        <meta property="og:image" content="https://wedding.nasfong.site/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        {/* og:url is removed from static meta tags - will be set dynamically in page.tsx */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wedding Invitation - Tangfong & Sreyren" />
        <meta property="og:locale" content="km_KH" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍" />
        <meta name="twitter:description" content="យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍" />
        <meta name="twitter:image" content="https://wedding.nasfong.site/og-image.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&family=Bokor&family=Dangrek&family=Fasthand&family=Hanuman:wght@100;300;400;700;900&family=Koulen&family=Moul&family=Taprom&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AudioProvider>
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
