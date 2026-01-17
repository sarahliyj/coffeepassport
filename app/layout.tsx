import type { Metadata } from "next";
import { Indie_Flower, Shadows_Into_Light, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const indieFlower = Indie_Flower({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: "400",
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-handwritten-heading",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Bean Passport",
  description: "Track your coffee journey around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${indieFlower.variable} ${shadowsIntoLight.variable} ${geistMono.variable} antialiased bg-[var(--cream)] text-[var(--espresso)] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
