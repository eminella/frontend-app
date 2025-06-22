import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Eminella</h2>

      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="cursor-pointer px-4 py-2 hover:bg-gray-700 rounded">
          Ürünler
        </div>

        {showDropdown && (
          <div className="absolute left-0 top-full mt-1 bg-gray-800 shadow-md rounded w-full z-10">
            <Link
              href="/admin/products"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Ürün Listesi
            </Link>
            <Link
              href="/admin/products/new"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Yeni Ürün Ekle
            </Link>
          </div>
        )}
      </div>

      <Link
        href="/admin/orders"
        className="block px-4 py-2 hover:bg-gray-700 rounded"
      >
        Siparişler
      </Link>
    </aside>
  );
}
