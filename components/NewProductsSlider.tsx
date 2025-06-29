// frontend-app/components/NewProductsSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string; // ✅ kategori burada da gerekli!
}

export default function NewProductsSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .slice()
          .reverse()
          .slice(0, 5)
          .map((item: any) => ({
            ...item,
            category: item.category || 'Genel', // ✅ garantiye al
          }));
        setProducts(sorted);
      });
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🆕 Yeni Ürünler</h2>
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
              <p className="text-green-600 font-bold mb-2">{product.price} ₺</p>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    category: product.category, // ✅ bu alan artık garanti
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
