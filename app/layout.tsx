// frontend-app/src/app/layout.tsx
'use client';

import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import MiniCart from '@/components/MiniCart';
import BackToTopButton from '@/components/BackToTopButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const metadata = {
  title: 'Eminella | Takı & Aksesuar Mağazası',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin sayfalarında header göstermiyoruz
  const showHeader = !pathname.startsWith('/admin');

  return (
    <html lang="tr">
      <body className="flex flex-col min-h-screen bg-white text-black">
        <CartProvider>
          <AuthProvider>
            {/* HEADER */}
            {showHeader && <Header />}

            {/* ANA GÖVDE */}
            <main className="flex-grow bg-white">{children}</main>

            {/* FOOTER */}
            {showHeader && (
              <footer className="bg-white py-12 mt-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h5 className="font-bold mb-4 text-gray-800">Eminella</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        <Link href="/hakkimizda">Hakkımızda</Link>
                      </li>
                      <li>
                        <Link href="/bize-ulasin">Bize Ulaşın</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold mb-4 text-gray-800">Eminella Market</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        <Link href="/cerez-politikasi">Çerez Politikamız</Link>
                      </li>
                      <li>
                        <Link href="/mesafeli-satis">Mesafeli Satış</Link>
                      </li>
                      <li>
                        <Link href="/sss">Sıkça Sorulan Sorular</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold mb-4 text-gray-800">Hesabım</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        <Link href="/uyelik">Üyelik Bilgileri</Link>
                      </li>
                      <li>
                        <Link href="/iade-basvurusu">İptal / İade Başvurusu</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold mb-4 text-gray-800">Müşteri Hizmetleri</h5>
                    <p className="flex items-center text-sm text-gray-700 mb-4">
                      <span className="inline-block w-5 h-5 mr-2 bg-phone-icon bg-contain"></span>
                      0850 335 12 78
                    </p>
                    <div className="flex space-x-4 mb-4">
                      <a
                        href="#"
                        className="inline-block w-6 h-6 bg-instagram-icon bg-contain"
                        aria-label="Instagram"
                      ></a>
                      <a
                        href="#"
                        className="inline-block w-6 h-6 bg-facebook-icon bg-contain"
                        aria-label="Facebook"
                      ></a>
                    </div>
                    <p className="text-xs text-gray-700">
                      Eminella <span className="font-medium text-purple-500">Premium</span>
                    </p>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-8 border-t pt-6 text-center text-xs text-gray-700">
                  <p>© 2025 Eminella | Tüm hakları saklıdır. Kredi kartı bilgileriniz 256-bit SSL ile korunmaktadır.</p>
                </div>
              </footer>
            )}

            <MiniCart />
            <BackToTopButton />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
