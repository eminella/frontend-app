// frontend-app/app/admin/layout.tsx

'use client';

import { useState } from 'react';
import LogoutButton from '@/components/LogoutButton';
import AdminHeader from '@/components/AdminHeader';  // AdminHeader import edildi

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isProductMenuOpen, setProductMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-sans flex-col">
      {/* Üstte AdminHeader */}
      <AdminHeader />

      <div className="flex flex-1">
        {/* Sol Menü */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 relative">
          <nav className="space-y-2">
            <div
              className="relative group"
              onMouseEnter={() => setProductMenuOpen(true)}
              onMouseLeave={() => setProductMenuOpen(false)}
            >
              <div className="hover:bg-gray-800 p-2 rounded cursor-pointer flex justify-between items-center">
                📦 Ürünler
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isProductMenuOpen && (
                <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg z-20 w-48">
                  <a href="/admin/products" className="block px-4 py-2 text-sm hover:bg-gray-700">• Ürün Listesi</a>
                  <a href="/admin/products/new" className="block px-4 py-2 text-sm hover:bg-gray-700">• Ürün Ekle</a>
                </div>
              )}
            </div>

            <a href="/admin/orders" className="hover:bg-gray-800 p-2 rounded block">
              🧾 Siparişler
            </a>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-4">Sinan YELEK</p>
            <LogoutButton />
          </div>
        </aside>

        {/* Sağ İçerik */}
        <main className="flex-1 bg-gray-100 p-10">{children}</main>
      </div>
    </div>
  );
}
