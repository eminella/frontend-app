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
    <main className="bg-white py-6 px-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tüm Ürünler</h2>

      <div className="overflow-x-auto scroll-smooth hide-scrollbar">
        <div className="flex gap-4 min-w-max">
          {products.map(product => (
            <div
              key={product.id}
              className="min-w-[220px] max-w-[220px] bg-white border rounded-xl shadow p-4 flex-shrink-0"
            >
              <img
                src={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h3 className="text-md font-semibold mb-1">{product.name}</h3>
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
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded-full"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
