'use client';

import { useState } from 'react';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const res = await fetch(`${API}/api/products`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Ürün eklendi!');
        setName('');
        setPrice('');
        setImage(null);
      } else {
        alert('Hata oluştu!');
      }
    } catch (error) {
      console.error('Ürün ekleme hatası:', error);
      alert('Sunucu hatası');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ürün Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Kaydet
        </button>
      </form>
    </main>
  );
}
