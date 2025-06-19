// frontend-app/src/app/layout.tsx
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import MiniCart from '@/components/MiniCart';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata = {
  title: 'Eminella | Takı & Aksesuar Mağazası',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          {/* *** HEADER COMPONENT *** */}
          <Header />

          {/* *** ANA İÇERİK *** */}
          <main className="flex-grow">
            {children}
          </main>

          {/* *** FOOTER *** */}
          <footer className="bg-white py-12">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 1. sütun */}
              <div>
                <h5 className="font-bold mb-4 text-gray-800">TRT Lisans</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#">Hakkımızda</a></li>
                  <li><a href="#">Lisanslarımız</a></li>
                  <li><a href="#">Bize Ulaşın</a></li>
                </ul>
              </div>
              {/* 2. sütun */}
              <div>
                <h5 className="font-bold mb-4 text-gray-800">TRT Market</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#">Çerez Politikamız</a></li>
                  <li><a href="#">Mesafeli Satış</a></li>
                  <li><a href="#">Sıkça Sorulan Sorular</a></li>
                </ul>
              </div>
              {/* 3. sütun */}
              <div>
                <h5 className="font-bold mb-4 text-gray-800">Hesabım</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><a href="#">Üyelik Bilgileri</a></li>
                  <li><a href="#">İptal / İade Başvurusu</a></li>
                </ul>
              </div>
              {/* 4. sütun */}
              <div>
                <h5 className="font-bold mb-4 text-gray-800">Müşteri Hizmetleri</h5>
                <p className="flex items-center text-sm text-gray-700 mb-4">
                  <span className="inline-block w-5 h-5 mr-2 bg-phone-icon bg-contain"></span>
                  444 0 878
                </p>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="inline-block w-6 h-6 bg-instagram-icon bg-contain"></a>
                  <a href="#" className="inline-block w-6 h-6 bg-facebook-icon bg-contain"></a>
                </div>
                <p className="text-xs text-gray-700">
                  T-SOFT <span className="font-medium text-purple-500">Premium</span>
                </p>
              </div>
            </div>

            <div className="container mx-auto px-6 mt-8 border-t pt-6 text-center text-xs text-gray-700">
              <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                <img src="/visa.svg" alt="Verified by Visa" className="h-6" />
                <img src="/master-securecode.svg" alt="Master SecureCODE" className="h-6" />
              </div>
              <p>© 2024 Eminella | Tüm hakları saklıdır. Kredi kartı bilgileriniz 256-bit SSL ile korunmaktadır.</p>
            </div>
          </footer>

          {/* *** MINI-CART OVERLAY & PANEL *** */}
          <MiniCart />

          {/* *** CLIENT-SIDE BACK TO TOP BUTTON *** */}
          <BackToTopButton />
        </CartProvider>
      </body>
    </html>
  );
}
