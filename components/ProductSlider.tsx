// frontend-app/components/ProductSlider.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
  originalPrice?: number;
}

export default function ProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((p: any) => p.price && p.originalPrice && p.price < p.originalPrice);
        const sorted = filtered.slice(0, 10);
        setProducts(sorted);
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth / 1.5;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Oklar */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full z-10 p-2 hover:bg-gray-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full z-10 p-2 hover:bg-gray-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Ürünler */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto pb-2 px-6 scroll-smooth hide-scrollbar"
      >
        {products.map((product) => {
          const hasDiscount =
            typeof product.originalPrice === 'number' &&
            product.originalPrice > product.price;

          const discountRate = hasDiscount
            ? Math.round(100 - (product.price * 100) / product.originalPrice!)
            : 0;

          return (
            <div
              key={product.id}
              className="min-w-[240px] max-w-[240px] bg-white rounded-xl shadow border p-4 flex-shrink-0 relative"
            >
              {/* % İNDİRİM etiketi */}
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  %{discountRate} İNDİRİM
                </div>
              )}

              <Image
                src={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-xl w-full h-40 object-cover mb-2"
              />
              <h3 className="text-md font-semibold mb-1">{product.name}</h3>
              {hasDiscount && (
                <p className="text-sm text-gray-400 line-through">
                  {product.originalPrice?.toFixed(2)} TL
                </p>
              )}
              <p className="text-red-600 font-bold text-lg mb-2">
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
                className="w-full border text-sm font-semibold rounded-full py-2 hover:bg-gray-100 transition flex items-center justify-center gap-1"
              >
                Sepete Ekle →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
