import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🟢 Sepet sistemi için context import
import CartProvider from "../../context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eminella | Takı & Aksesuar Mağazası",
  description:
    "Altın, gümüş, bijuteri ürünleriyle dolu özel bir mağaza. Kolyeler, küpeler, bileklikler ve daha fazlası Eminella.com’da!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🔁 Sepet sistemini tüm uygulamaya sar */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
