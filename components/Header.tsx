// frontend-app/components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 shadow bg-white">
      {/* Logo veya sol taraf */}
      <Link href="/" className="text-xl font-bold text-gray-800">
        Eminella
      </Link>

      {/* Sağ üst (Giriş + Sepet) */}
      <div className="flex items-center gap-6">
        {/* Giriş/Kayıt */}
        <Link href="/login" className="flex items-center gap-1 text-sm hover:underline text-gray-700">
          <User size={20} />
          <span>
            Giriş Yap <span className="text-gray-400">|</span> Kayıt Ol
          </span>
        </Link>

        {/* Sepet */}
        <Link href="/cart" className="relative flex items-center gap-1 text-sm hover:underline text-gray-700">
          <ShoppingCart size={20} />
          <span>Sepetim</span>
          {/* Sepet adedi (şu an sabit 0) */}
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </Link>
      </div>
    </header>
  );
}
