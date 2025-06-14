'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';
  const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mağaza</h1>
      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/store/${product.id}`}>
            <div className="border rounded-xl p-4 shadow hover:shadow-md transition">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.price} ₺</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
