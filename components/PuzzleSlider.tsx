// frontend-app/components/PuzzleSlider.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
}

export default function PuzzleSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((p: Product) =>
          p.category?.toLowerCase().includes('puzzle')
        );
        setProducts(filtered);
      });
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const container = sliderRef.current;
    if (!container) return;
    const offset = container.offsetWidth / 1.5;
    container.scrollBy({
      left: dir === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) return null;

  return (
    <div className="relative mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-black flex justify-center items-center gap-2">
        🧩 <span>Puzzle Modelleri</span>
      </h2>

      {/* Oklar */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white shadow rounded-full z-10 p-2 hover:bg-gray-800"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white shadow rounded-full z-10 p-2 hover:bg-gray-800"
      >
        <ChevronRight size={20} />
      </button>

      {/* Ürünler */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-2 px-6 scroll-smooth hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[240px] max-w-[240px] bg-white rounded-xl shadow border p-4 flex-shrink-0"
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
  );
}
