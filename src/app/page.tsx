'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  isNew?: boolean; // Sonradan eklendi
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'none' | 'price-asc' | 'price-desc'>('none');
  const [showCategories, setShowCategories] = useState(false); // Mobil için

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
  const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch(BASE_URL);
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ HATA:", JSON.stringify(error, null, 2));
      }
    };
    fetchProducts();
  }, []);

  let filteredProducts = products.filter(
    (p) =>
      (selectedCategory === 'Tümü' || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sıralama
  if (sort === 'price-asc') filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50">
      {/* Banner */}
      <header className="py-6 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-800 tracking-tight">Eminella</h1>
        <p className="mt-2 text-gray-600">Takı & Aksesuar Mağazası - 2025 Koleksiyonu</p>
      </header>

      {/* Arama & Sıralama */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-3">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Ürün ara..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-yellow-200 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => setSort('none')}
            className={`px-3 py-2 rounded ${sort === 'none' ? 'bg-yellow-700 text-white' : 'bg-gray-100'}`}
          >Varsayılan</button>
          <button
            onClick={() => setSort('price-asc')}
            className={`px-3 py-2 rounded ${sort === 'price-asc' ? 'bg-yellow-700 text-white' : 'bg-gray-100'}`}
          >Fiyat Artan</button>
          <button
            onClick={() => setSort('price-desc')}
            className={`px-3 py-2 rounded ${sort === 'price-desc' ? 'bg-yellow-700 text-white' : 'bg-gray-100'}`}
          >Fiyat Azalan</button>
        </div>
      </div>

      {/* Kategoriler */}
      <div className="max-w-5xl mx-auto px-3 mb-6">
        {/* Mobil açılır menü */}
        <div className="sm:hidden mb-3">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-700 text-white font-semibold w-full"
          >
            Kategoriler {showCategories ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showCategories && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategories(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === cat
                      ? 'bg-yellow-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Masaüstü butonları */}
        <div className="hidden sm:flex gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat
                  ? 'bg-yellow-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün Listesi */}
      <main className="max-w-5xl mx-auto px-3 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-12">
              Ürün bulunamadı.
            </div>
          )}
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="relative bg-white p-4 rounded-xl shadow hover:shadow-2xl transition-all cursor-pointer group hover:scale-105"
            >
              {/* Yeni Rozeti */}
              {p.isNew && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Yeni
                </span>
              )}
              <img
                src={p.imageUrl || "/default-product.jpg"}
                alt={p.name}
                className="w-full h-36 object-cover rounded mb-3"
              />
              <div className="font-semibold text-gray-900 mb-1 line-clamp-2 min-h-10">{p.name}</div>
              <div className="text-yellow-700 font-bold text-lg mb-2">{p.price.toFixed(2)} ₺</div>
              {/* Favori Butonu */}
              <button className="absolute top-2 right-2 text-gray-300 hover:text-yellow-700 transition">
                <FaStar />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
