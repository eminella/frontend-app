// frontend-app/components/Header.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartItems } = useCart();
  const router = useRouter();

  return (
    <header className="p-4 bg-yellow-800 text-white flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">Eminella</h1>
      </Link>

      <div className="flex items-center space-x-4 text-sm">
        <Link href="/login" className="flex items-center space-x-1 hover:opacity-90">
          <User className="w-5 h-5" />
          <span>Giriş Yap</span>
        </Link>
        <span className="opacity-50">|</span>
        <Link href="/register" className="flex items-center space-x-1 hover:opacity-90">
          <User className="w-5 h-5" />
          <span>Kayıt Ol</span>
        </Link>
        <span className="opacity-50">|</span>
        <button
          onClick={() => router.push('/cart')}
          className="relative flex items-center space-x-1 hover:opacity-90"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Sepet</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
