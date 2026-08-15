import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixel Egg Timer",
  description:
    "A cozy retro 8-bit egg timer. Choose soft, jammy, medium, or hard — and wait for the ding.",
};

export const viewport: Viewport = {
  themeColor: "#F5E6C8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body className="font-pixel paper-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}