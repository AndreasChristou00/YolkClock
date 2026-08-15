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
  metadataBase: new URL("https://yolkclock.andreaschristou.eu"),

  title: "Yolk Clock | Simple Egg Timer",

  description:
    "A simple retro egg timer for perfectly cooked eggs. Choose soft, jammy, medium, or hard and start the timer.",

  alternates: {
    canonical: "/",
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  openGraph: {
    title: "Yolk Clock | Simple Egg Timer",
    description:
      "A simple retro egg timer for perfectly cooked eggs. Choose soft, jammy, medium, or hard.",
    url: "https://yolkclock.andreaschristou.eu",
    siteName: "Yolk Clock",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Yolk Clock | Simple Egg Timer",
    description:
      "A simple retro egg timer for perfectly cooked eggs. Choose soft, jammy, medium, or hard.",
  },
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