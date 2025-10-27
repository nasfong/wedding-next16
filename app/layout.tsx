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
  title: "Wedding Invitation - សិរីមង្គលអាពាហ៍ពិពាហ៍",
  description: "Wedding invitation for Samnang Tangfong and Ngin Sreyren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <head>
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
