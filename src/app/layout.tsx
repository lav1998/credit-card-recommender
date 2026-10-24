import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardSmart India — Credit Card Recommender, LTF Cards & Spend Analyzer",
  description:
    "Compare and analyse all credit cards in India. Find Lifetime Free (LTF) cards, ways to make cards LTF via spend waivers and alumni programs, and top cards for Travel, Fuel, and Shopping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
