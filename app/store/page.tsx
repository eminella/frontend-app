// frontend-app/app/store/page.tsx
'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import StarRating from '@/components/StarRating';
import BannerSlider from '@/components/BannerSlider';
import PopularCategories from '@/components/PopularCategories';
import ProductSlider from '@/components/ProductSlider';
import BestSellersSlider from '@/components/BestSellersSlider';

// ✅ Ürün tipi
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

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const handleAddToCartAndRedirect = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    });
    router.push('/cart');
  };

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

        {/* 🛒 Ürün Kartları */}
        <div className="w-full px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-gray-300 rounded-3xl shadow-lg p-6 flex flex-col h-full"
            >
              <Link
                href={`/store/${product.id}`}
                className="relative h-52 w-full mb-6 block rounded-2xl overflow-hidden shadow-inner"
              >
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="bg-gray-100 h-full flex items-center justify-center rounded-2xl">
                    <span className="text-gray-400">Resim yok</span>
                  </div>
                )}
              </Link>

              <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={product.rating ?? 0} />
                <span className="text-sm text-gray-500">({product.reviewCount ?? 0})</span>
              </div>
              <p className="text-2xl font-extrabold text-green-700 mb-6">
                {product.price.toFixed(2)} ₺
              </p>
              <button
                onClick={() => handleAddToCartAndRedirect(product)}
                className="mt-auto bg-red-600 text-white rounded-2xl py-3 font-bold hover:bg-red-700 transition-shadow shadow-md"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 🔻 ALTTA POPÜLER KATEGORİLER */}
      <PopularCategories />
    </>
  );
}