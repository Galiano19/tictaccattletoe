import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "./providers/TanStackProvider";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tictaccattletoe.vercel.app/"),
  title: {
    default: "Tic Tac Cattle Toe - Tic Tac Cattle Toe Game with Weather",
    template: "%s | Tic Tac Cattle Toe",
  },
  description:
    "Play a tic-tac-toe game, real-time weather integration, and fascinating Scotland facts. Free game",
  keywords: [
    "tic-tac-toe",
    "Scotland facts",
    "free game",
    "strategy game",
    "browser game",
    "noughts and crosses",
    "interactive game",
  ],
  authors: [{ name: "Galiano19" }],
  creator: "Galiano19",
  publisher: "Galiano19",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tictaccattletoe.vercel.app/",
    title: "Tic-Tac-Cattle-Toe - The Tic-Tac-Toe Game",
    description:
      "Experience the tic-tac-toe game, weather features, and Scotland trivia. Play for free in your browser!",
    siteName: "Tic Tac Cattle Toe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tac Cattle Toe - The Tic-Tac-Toe Game",
    description:
      "Play an tic-tac-toe game and weather integration. Free online!",
    creator: "@galiano19",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "games",
  classification: "Entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
