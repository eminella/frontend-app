// frontend-app/app/admin/products/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Ürünler alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Ürün Yönetimi</h1>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz ürün eklenmemiş.</p>
      ) : (
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-bold">ID</th>
              <th className="px-4 py-2 font-bold">Görsel</th>
              <th className="px-4 py-2 font-bold">İsim</th>
              <th className="px-4 py-2 font-bold">Fiyat</th>
              <th className="px-4 py-2 font-bold">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2 font-medium">{product.price} ₺</td>
                <td className="px-4 py-2 font-medium">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
