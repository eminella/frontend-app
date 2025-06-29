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
      <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-6 w-full">
        {/* ⭐ Banner slider */}
        <BannerSlider />

        {/* 🔥 Kampanya Ürünleri */}
        <div className="max-w-7xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-700">Kampanyalı Ürünler</h2>
          <ProductSlider />
        </div>

        {/* 💥 Çok Satanlar */}
        <div className="max-w-7xl mx-auto my-10">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-700">Çok Satanlar</h2>
          <BestSellersSlider />
        </div>

        {/* 🧭 Kategori Menüsü */}
        <div className="bg-gray-100 py-3 px-6 rounded-xl shadow-sm mb-10 max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-6 justify-center flex-wrap text-sm font-semibold text-gray-700">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition px-3 pb-2 border-b-4 rounded-t-lg ${
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

      {/* 🔻 ALTTA POPÜLER KATEGORİLER */}
      <PopularCategories />
    </>
  );
}
