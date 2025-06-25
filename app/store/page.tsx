'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

import StarRating from '@/components/StarRating'; // Yıldız bileşeni

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
            imageUrl: item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0].trim() : '',
            rating: item.rating ?? 4.5, // varsa gerçek rating yoksa 4.5
            reviewCount: item.reviewCount ?? 11262, // varsa gerçek yorum yoksa örnek sayı
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
    addToCart(product);
    router.push('/cart');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">
      {/* Kategori Menüsü */}
      <div className="bg-gray-100 py-3 px-4 rounded-xl shadow-sm mb-10 max-w-5xl mx-auto overflow-x-auto">
        <div className="flex gap-6 justify-center flex-wrap text-sm font-semibold text-gray-700">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`transition px-2 pb-1 border-b-2 ${
                selectedCategory === cat
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent hover:border-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün Kartları */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="border rounded-2xl shadow p-4 flex flex-col h-full relative"
          >
            {/* Detay sayfasına link */}
            <Link href={`/store/${product.id}`} className="block relative h-48 w-full mb-4">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain rounded-xl"
                />
              ) : (
                <div className="bg-gray-100 h-full flex items-center justify-center rounded-xl">
                  <span className="text-gray-400">Resim yok</span>
                </div>
              )}
            </Link>

            <h3 className="text-lg font-semibold mb-1 text-black opacity-100">{product.name}</h3>

            {/* Yıldız ve yorum */}
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating ?? 0} />
              <span className="text-sm text-gray-500">({product.reviewCount ?? 0})</span>
            </div>

            <p className="text-xl font-bold text-green-600 mb-4 text-black opacity-100">
              {product.price.toFixed(2)} ₺
            </p>

            <button
              onClick={() => handleAddToCartAndRedirect(product)}
              className="mt-auto flex items-center justify-center gap-2 rounded-2xl py-2 px-4
                         bg-white text-red-600 border border-red-600
                         hover:bg-red-600 hover:text-white hover:shadow-md transition"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
