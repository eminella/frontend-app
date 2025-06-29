'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminSidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (key: string) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0f172a] text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Paneli</h2>

      {/* Ürünler Menüsü */}
      <div>
        <button
          onClick={() => toggleMenu('products')}
          className="w-full text-left font-semibold py-2 hover:bg-slate-800 transition rounded"
        >
          📦 Ürünler
        </button>
        {openMenu === 'products' && (
          <div className="ml-4 mt-1 space-y-1 text-sm">
            <Link href="/admin/products" className="block hover:text-yellow-400">
              • Ürün Listesi
            </Link>
            <Link href="/admin/products/new" className="block hover:text-yellow-400">
              • Ürün Ekle
            </Link>
          </div>
        )}
      </div>

      {/* Siparişler */}
      <div className="mt-4">
        <Link
          href="/admin/orders"
          className="block font-semibold py-2 hover:bg-slate-800 transition rounded"
        >
          🧾 Siparişler
        </Link>
      </div>

      {/* Mağaza Tasarımı */}
      <div className="mt-4">
        <button
          onClick={() => toggleMenu('design')}
          className="w-full text-left font-semibold py-2 hover:bg-slate-800 transition rounded"
        >
          🖼️ Mağaza Tasarımı
        </button>
        {openMenu === 'design' && (
          <div className="ml-4 mt-1 space-y-1 text-sm">
            <Link href="/admin/banner" className="block hover:text-yellow-400">
              • Banner Yükle
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 border-t pt-4 text-xs text-gray-400">
        Sinan YELEK
      </div>
    </aside>
  );
}
