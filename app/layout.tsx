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
  title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍ | Samnang & Sreyren",
  description: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស សំណាង តាំងហ្វុង និង កូនស្រី ង៉ិន ស្រីរ៉េន នៅថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥",
  keywords: ["Wedding Invitation", "សិរីមង្គលអាពាហ៍ពិពាហ៍", "Samnang Tangfong", "Ngin Sreyren", "Cambodia Wedding", "Khmer Wedding"],
  authors: [{ name: "Samnang & Sreyren" }],
  creator: "Samnang & Sreyren",
  publisher: "Wedding Invitation",
  metadataBase: new URL('https://wedding.nasfong.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍",
    description: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស សំណាង តាំងហ្វុង និង កូនស្រី ង៉ិន ស្រីរ៉េន",
    url: 'https://wedding.nasfong.site',
    siteName: 'Wedding Invitation - Samnang & Sreyren',
    images: [
      {
        url: '/images/gallery/8.jpg',
        width: 1200,
        height: 1600,
        alt: 'Wedding Invitation - Samnang Tangfong & Ngin Sreyren',
      },
    ],
    locale: 'km_KH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍",
    description: "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍",
    images: ['/images/gallery/8.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
