// frontend-app/app/admin/banner/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function BannerPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    const res = await fetch(`${BASE_URL}/api/banner`);
    const data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Görsel seçmediniz.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const res = await fetch(`${BASE_URL}/api/banner`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setTitle('');
      setImage(null);
      fetchBanners();
      alert('Banner eklendi!');
    } else {
      alert('Yükleme hatası.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🖼️</span>
        <h1 className="text-2xl font-bold">Mağaza Tasarımı - Banner Ekle</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Banner Başlığı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Yaz Kampanyası"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Görsel Seç</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded"
        >
          Banner Ekle
        </button>
      </form>
    </div>
  );
}
