'use client';

import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Eminella</h2>

      <nav className="space-y-2">
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="hover:bg-gray-800 p-2 rounded cursor-pointer flex justify-between items-center">
            📦 Ürünler
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {open && (
            <div className="absolute left-full top-0 ml-2 bg-gray-800 rounded shadow-lg z-20 w-48">
              <Link href="/admin/products" className="block px-4 py-2 text-sm hover:bg-gray-700">
                • Ürün Listesi
              </Link>
              <Link href="/admin/products/new" className="block px-4 py-2 text-sm hover:bg-gray-700">
                • Ürün Ekle
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/admin/orders"
          className="hover:bg-gray-800 p-2 rounded block"
        >
          🧾 Siparişler
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-4">Sinan YELEK</p>
        <LogoutButton />
      </div>
    </aside>
  );
}
