'use client';

import { useState } from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isProductMenuOpen, setProductMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sol Menü */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 relative">
        <h2 className="text-2xl font-bold mb-8">Eminella</h2>

        <nav className="space-y-2">
          {/* Yan Açılır Menü Başlangıcı */}
          <div
            className="relative"
            onMouseEnter={() => setProductMenuOpen(true)}
            onMouseLeave={() => setProductMenuOpen(false)}
          >
            <div className="hover:bg-gray-800 p-2 rounded block cursor-pointer">
              📦 Ürünler
            </div>

            {isProductMenuOpen && (
              <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg z-50 p-2 w-40">
                <a
                  href="/admin/products"
                  className="block text-sm hover:bg-gray-700 p-2 rounded"
                >
                  • Ürün Listesi
                </a>
                <a
                  href="/admin/products/new"
                  className="block text-sm hover:bg-gray-700 p-2 rounded"
                >
                  • Ürün Ekle
                </a>
              </div>
            )}
          </div>
          {/* Yan Açılır Menü Sonu */}

          <a href="/admin/orders" className="hover:bg-gray-800 p-2 rounded block">
            🧾 Siparişler
          </a>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-4">Sinan YELEK</p>
          <LogoutButton />
        </div>
      </aside>

      {/* İçerik */}
      <main className="flex-1 bg-gray-100 p-10">{children}</main>
    </div>
  );
}
