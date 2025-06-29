'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrls: string[];
  imageUrl?: string;
}

export default function ProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter((item: Product) => item.imageUrls && item.imageUrls.length > 0)
          .slice(0, 15);
        setProducts(filtered);
      });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Kaydırma Okları */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronLeft className="text-gray-700" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
      >
        <ChevronRight className="text-gray-700" />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-8 py-4 hide-scrollbar"
      >
        {products.map((product) => {
          const image = product.imageUrls[0]?.trim() || '/placeholder.jpg';
          const hasDiscount = product.originalPrice && product.originalPrice > product.price;
          const discountRate = hasDiscount
            ? Math.round(100 - (product.price * 100) / product.originalPrice!)
            : 0;

          return (
            <div
              key={product.id}
              className="min-w-[220px] max-w-[220px] bg-white border rounded-2xl shadow-sm p-3 flex-shrink-0 relative"
            >
              {/* % İndirim etiketi */}
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  %{discountRate} İndirim
                </div>
              )}
              <Image
                src={image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-36 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
              {hasDiscount && (
                <p className="text-xs text-gray-400 line-through mt-1">
                  {product.originalPrice?.toFixed(2)} TL
                </p>
              )}
              <p className="text-red-600 font-bold text-md">{product.price.toFixed(2)} TL</p>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: image,
                    category: product.category,
                  })
                }
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded-full flex items-center justify-center gap-1"
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
