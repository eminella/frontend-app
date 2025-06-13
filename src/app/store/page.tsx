'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Render'da uyanması için küçük bir ping
        await fetch(BASE_URL);

        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('❌ Backend bağlantı hatası:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mağaza</h1>

      {products.length === 0 && (
        <p className="text-gray-600">Henüz ürün yok.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-blue-600 font-bold mt-1">
                {product.price.toFixed(2)} TL
              </p>
              {/* Buraya sepete ekle butonu eklenebilir */}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
