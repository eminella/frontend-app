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
    <main className="min-h-screen bg-white py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-xl shadow p-4 flex flex-col items-center">
          <img
            src={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
          <h3 className="text-lg font-semibold text-center mb-1">{product.name}</h3>
          <p className="text-red-600 font-bold text-md mb-2">{product.price.toFixed(2)} TL</p>
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
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-full text-sm"
          >
            Sepete Ekle
          </button>
        </div>
      ))}
    </main>
  );
}
