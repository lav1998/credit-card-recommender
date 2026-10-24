import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CardSmart India — Intelligent Credit Card Recommender & LTF Directory",
  description:
    "An editorial intelligence platform for Indian credit cards. Discover lifetime-free pathways, upgrade routes for delisted cards, and personalized recommendations tailored to your banking relationships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased dark ${sansFont.variable} ${serifFont.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}

