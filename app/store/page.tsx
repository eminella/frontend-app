// frontend-app/app/store/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import BannerSlider from '@/components/BannerSlider';
import PopularCategories from '@/components/PopularCategories';
import ProductSlider from '@/components/ProductSlider';
import BestSellersSlider from '@/components/BestSellersSlider';

// Ürün tipi
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrls: string[];
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
};

// Kategori listesi
const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

export default function StorePage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';
  const { addToCart } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

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
    <>
      <main className="min-h-screen bg-white py-4 px-4 w-full">
        {/* Banner */}
        <BannerSlider />

        {/* Kampanyalı Ürünler */}
        <div className="max-w-7xl mx-auto my-8">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Kampanyalı Ürünler</h2>
          <ProductSlider />
        </div>

        {/* Çok Satanlar */}
        <div className="max-w-7xl mx-auto my-8">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Çok Satanlar</h2>
          <BestSellersSlider />
        </div>

        {/* Kategori Butonları */}
        <div className="bg-gray-50 py-2 px-4 rounded-xl shadow-sm mb-10 max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-4 justify-center flex-wrap text-sm font-semibold text-gray-700">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition px-3 pb-1 border-b-2 rounded-t-lg whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'border-red-600 text-red-600 font-bold'
                    : 'border-transparent hover:border-gray-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Popüler Kategoriler */}
      <PopularCategories />
    </>
  );
}