// frontend-app/components/HorizontalProductSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

interface Props {
  title: string;
  products: Product[];
}

export default function HorizontalProductSlider({ title, products }: Props) {
  const [scrollX, setScrollX] = useState(0);

  const scroll = (dir: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${title}`);
    if (!container) return;
    const scrollAmount = dir === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="space-x-2 hidden md:block">
          <button onClick={() => scroll('left')}><ChevronLeft /></button>
          <button onClick={() => scroll('right')}><ChevronRight /></button>
        </div>
      </div>

      <div
        id={`scroll-${title}`}
        className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth"
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[240px]">
            <ProductCard {...product} onAddToCart={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
