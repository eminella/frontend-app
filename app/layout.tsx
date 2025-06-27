import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import MiniCart from '@/components/MiniCart';
import BackToTopButton from '@/components/BackToTopButton';
import Link from 'next/link';

export const metadata = {
  title: 'Eminella | Takı & Aksesuar Mağazası',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="flex flex-col min-h-screen bg-white text-black">
        <CartProvider>
          <AuthProvider>
            {/* HEADER */}
            <Header />

            {/* ANA GÖVDE */}
            <main className="flex-grow bg-white">
              {children}
            </main>

            {/* FOOTER */}
            <footer className="bg-white py-12 mt-10">
              {/* ... footer içeriği ... */}
            </footer>

            <MiniCart />
            <BackToTopButton />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
