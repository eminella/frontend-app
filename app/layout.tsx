import './globals.css';
import Link from 'next/link';
import CartProvider from '@/context/CartContext'; // ✅ doğru yolu kontrol et

export const metadata = {
  title: 'Eminella | Takı & Aksesuar Mağazası',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <CartProvider> {/* ✅ Sepet sistemi için gerekli olan sarmalayıcı */}
          <header className="p-4 bg-yellow-800 text-white flex justify-between">
            <Link href="/"><h1 className="text-2xl font-bold">Eminella</h1></Link>
            <nav>
              <Link href="/store" className="px-2">Mağaza</Link>
              <Link href="/cart" className="px-2">Sepet</Link>
              <Link href="/account" className="px-2">Hesabım</Link>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="p-4 bg-gray-100 text-center text-sm text-gray-600">
            © 2025 Eminella. Tüm hakları saklıdır.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
