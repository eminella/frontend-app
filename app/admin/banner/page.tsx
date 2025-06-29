// frontend-app/app/admin/banner/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function BannerPage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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

    const res = await fetch(`${BASE_URL}/api/banner`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, imageUrl }),
    });

    if (res.ok) {
      setTitle('');
      setImageUrl('');
      fetchBanners();
      alert('Banner başarıyla eklendi!');
    } else {
      alert('Hata oluştu.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
      {/* Başlık */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🛍️</span>
        <h1 className="text-2xl font-bold">Mağaza Tasarımı - Banner Ekle</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Banner Başlığı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Yaz İndirimi"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Görsel URL (Cloudinary)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded"
        >
          Banner Ekle
        </button>
      </form>

      {/* Mevcut Bannerlar */}
      {banners.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Yüklenmiş Bannerlar</h2>
          <div className="grid grid-cols-1 gap-4">
            {banners.map((banner: any) => (
              <div
                key={banner.id}
                className="border rounded p-4 shadow flex flex-col sm:flex-row gap-4 items-center"
              >
                <img src={banner.imageUrl} alt={banner.title} className="w-40 h-24 object-cover rounded" />
                <p className="font-medium text-gray-700">{banner.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
