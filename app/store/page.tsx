// frontend-app/app/store/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

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
  const { addToCart } = useCart();     // ◀ context’ten ekleme fonksiyonu

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setProducts(data))
      .catch((err) => console.error('Ürünler yüklenemedi:', err));
  }, [BASE_URL]);

  const filtered = selectedCategory === 'Tümü'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">
      {/* Kategori Menüsü */}
      <div className="bg-gray-100 py-3 px-4 rounded-xl shadow-sm mb-10 max-w-5xl mx-auto overflow-x-auto">
        <div className="flex gap-6 justify-center flex-wrap text-sm font-semibold text-gray-700">
          {categories.map((cat) => (
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
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            imageUrl={p.imageUrl}
            onAddToCart={() => addToCart(p)}
          />
        ))}
      </div>
    </main>
  );
}
