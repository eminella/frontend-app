// frontend-app/app/store/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

export default function StorePage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(err => console.error('Ürünler yüklenemedi:', err));
  }, [BASE_URL]);

  const filtered =
    selectedCategory === 'Tümü'
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">
      {/* Kategori Menüsü */}
      <div className="bg-gray-100 py-3 px-4 rounded-xl shadow-sm mb-10 max-w-5xl mx-auto overflow-x-auto">
        <div className="flex gap-6 justify-center flex-wrap text-sm font-semibold text-gray-700">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`transition px-2 pb-1 border-b-2 ${
                selectedCategory === cat
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent hover:border-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün Kartları */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filtered.map(p => (
          <div
            key={p.id}
            className="border rounded-2xl shadow p-4 flex flex-col h-full relative"
          >
            {/* Detay sayfasına link */}
            <Link href={`/store/${p.id}`} className="block relative h-48 w-full mb-4">
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-contain rounded-xl"
                />
              ) : (
                <div className="bg-gray-100 h-full flex items-center justify-center rounded-xl">
                  <span className="text-gray-400">Resim yok</span>
                </div>
              )}
            </Link>

            <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
            <p className="text-xl font-bold text-green-600 mb-4">
              {p.price.toFixed(2)} ₺
            </p>

            <button
              onClick={() => addToCart(p)}
              className="mt-auto flex items-center justify-center gap-2 rounded-2xl py-2 px-4 
                         bg-white text-red-600 border border-red-600 
                         hover:bg-red-600 hover:text-white hover:shadow-md transition"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
