'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 space-y-6">
      <h2 className="text-xl font-bold mb-6">Eminella</h2>

      <nav className="space-y-2">
        {/* Ürünler - Dropmenü */}
        <div className="group relative">
          <button className="w-full flex justify-between items-center px-3 py-2 hover:bg-gray-800 rounded">
            <span>📦 Ürünler</span>
            <span>▼</span>
          </button>

          <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-gray-800 w-full rounded shadow-lg z-10">
            <Link
              href="/admin/products"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                isActive('/admin/products') && !isActive('/admin/products/new') ? 'bg-gray-700' : ''
              }`}
            >
              Ürün Listesi
            </Link>
            <Link
              href="/admin/products/new"
              className={`block px-4 py-2 hover:bg-gray-700 ${
                isActive('/admin/products/new') ? 'bg-gray-700' : ''
              }`}
            >
              Ürün Ekle
            </Link>
          </div>
        </div>

        {/* Siparişler */}
        <Link
          href="/admin/orders"
          className={`block px-3 py-2 hover:bg-gray-800 rounded ${
            isActive('/admin/orders') ? 'bg-gray-800' : ''
          }`}
        >
          📑 Siparişler
        </Link>
      </nav>

      <footer className="absolute bottom-4 left-4 text-sm text-gray-400">
        Sinan YELEK
      </footer>
    </aside>
  );
}
