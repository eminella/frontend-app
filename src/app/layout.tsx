import type { Metadata } from "next";
import "./globals.css";

// 🟢 Sepet sistemi için context import
import CartProvider from "../../context/CartContext";

// İstersen Google Fonts (ör: Roboto) kullan:
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body className={`${roboto.className} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
