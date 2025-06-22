// frontend-app/app/admin/products/new/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Kolye');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert('Tüm alanları doldurun.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Ürün eklenemedi');

      router.push('/admin/products');
    } catch (err) {
      alert('Ürün eklenemedi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto bg-white p-6 shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">🆕 Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-900 mb-1">Ürün Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-900 mb-1">Fiyat (TL)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
        </div>
        <div>
          <label className="block font-medium text-gray-900 mb-1">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          >
            <option>Kolye</option>
            <option>Küpe</option>
            <option>Bileklik</option>
            <option>Yüzük</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-900 mb-1">Ürün Görseli</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full text-gray-900"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-700 hover:bg-yellow-800 text-white px-4 py-2 rounded font-semibold"
        >
          {loading ? 'Yükleniyor...' : 'Ürün Ekle'}
        </button>
      </form>
    </main>
  );
}
