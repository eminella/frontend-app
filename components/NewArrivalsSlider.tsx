'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

export default function NewArrivalsSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .sort((a: any, b: any) => b.id - a.id) // ✅ yeni ürünler en üstte
          .slice(0, 5)
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrls?.[0] || '',
            category: item.category || 'Yeni',
          }));
        setProducts(sorted);
      });
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          🆕 YENİ ÜRÜNLER
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {products.map(product => (
            <div
              key={product.id}
              className="min-w-[240px] max-w-[240px] bg-white rounded-xl shadow p-4 flex-shrink-0"
            >
              <Image
                src={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-xl w-full h-40 object-cover mb-2"
              />
              <h3 className="text-md font-semibold mb-1">{product.name}</h3>
              <p className="text-green-600 font-bold mb-2">
                {product.price.toFixed(2)} ₺
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
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
