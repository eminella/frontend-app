export const dynamic = "force-dynamic";
import { useEffect, useState } from 'react';

// ... geri kalan kodun aynı


type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  externalUrl?: string; // Trendyol linki gibi dış link için
};

const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('❌ HATA:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">
      {/* Kategoriler */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-yellow-700 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ürünler */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((p) => (
          <a
            key={p.id}
            href={p.externalUrl || 'https://trendyol.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="block group focus:outline-none"
            tabIndex={0}
          >
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition cursor-pointer group-hover:scale-105 h-full flex flex-col">
              <img
                src={p.imageUrl || '/default-product.jpg'}
                alt={p.name}
                className="w-full h-44 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                {p.name}
              </h2>
              <p className="text-yellow-700 font-bold text-lg mb-2">
                {p.price.toFixed(2)} ₺
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* ✅ Versiyon etiketi - sadece 1 kez görünür */}
      <div className="text-center mt-10">
        <p style={{ fontSize: '12px', color: 'gray' }}>
          v0.3.1 - son değişiklik deploy testi
        </p>
      </div>
    </main>
  );
}
