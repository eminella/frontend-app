'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => {
        console.error('Ürünler getirilemedi:', err);
        alert('Ürünler getirilemedi.');
      });
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ürünler</h1>

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white p-4 rounded shadow flex items-center gap-4"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <p className="font-bold text-gray-800">{product.name}</p>
              <p className="text-yellow-700">{product.price} ₺</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
