// frontend-app/app/store/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrls: string[];
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export default function StorePage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const cleanData = data.map(item => ({
            ...item,
            imageUrl:
              item.imageUrls && item.imageUrls.length > 0
                ? item.imageUrls[0].trim()
                : '',
            rating: item.rating ?? 4.5,
            reviewCount: item.reviewCount ?? 11262,
          }));
          setProducts(cleanData);
        }
      })
      .catch(err => console.error('Ürünler yüklenemedi:', err));
  }, [BASE_URL]);

  return (
    <main className="bg-white py-8 px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        🆕 En Yeni Ürünler
      </h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
        {products.map(product => (
          <div
            key={product.id}
            className="min-w-[220px] max-w-[220px] bg-white border rounded-2xl shadow p-4 flex-shrink-0 flex flex-col items-center"
          >
            <img
              src={product.imageUrl || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-sm font-semibold text-center mb-1 text-gray-700 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-red-600 font-bold text-sm mb-2">
              {product.price.toFixed(2)} TL
            </p>
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.imageUrl,
                  category: product.category,
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-full text-sm"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
