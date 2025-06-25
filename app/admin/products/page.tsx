// frontend-app/app/admin/products/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrls: string[];  // Çoklu görsel dizisi
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

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Bu ürünü silmek istediğine emin misin?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        alert('Silme işlemi başarısız.');
      }
    } catch (err) {
      console.error('Silme hatası:', err);
      alert('Sunucu hatası');
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Admin Ürün Yönetimi</h1>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz ürün eklenmemiş.</p>
      ) : (
        <table className="w-full text-left border border-gray-300 text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-bold text-gray-900">ID</th>
              <th className="px-4 py-2 font-bold text-gray-900">Görsel</th>
              <th className="px-4 py-2 font-bold text-gray-900">İsim</th>
              <th className="px-4 py-2 font-bold text-gray-900">Fiyat</th>
              <th className="px-4 py-2 font-bold text-gray-900">Kategori</th>
              <th className="px-4 py-2 font-bold text-gray-900">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-medium">{product.id}</td>
                <td className="px-4 py-2">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-4 py-2 font-semibold">{product.name}</td>
                <td className="px-4 py-2 font-semibold">{product.price} ₺</td>
                <td className="px-4 py-2 font-semibold">{product.category}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline font-bold"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
