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
      <h1 className="text-2xl font-bold mb-6">🆕 Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Ürün Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Fiyat (TL)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Kolye</option>
            <option>Küpe</option>
            <option>Bileklik</option>
            <option>Yüzük</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Ürün Görseli</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Yükleniyor...' : 'Ürün Ekle'}
        </button>
      </form>
    </main>
  );
}
