import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Chatbot from "@/components/shared/Chatbot";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Providers } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "farmMart",
  description:
    "farmMart is an agriculture e-commerce platform connecting buyers and sellers of farm produce, inputs, and services. Shop fresh, organic, and quality agricultural products online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="farmMart is an agriculture e-commerce platform connecting buyers and sellers of farm produce, inputs, and services. Shop fresh, organic, and quality agricultural products online."
        />
        <title>farmMart</title>
      </head>
      <body
        className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider>
          <Providers>
            <WishlistProvider>
              <CartProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Chatbot />
              </CartProvider>
            </WishlistProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
