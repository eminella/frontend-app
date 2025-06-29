// frontend-app/app/admin/banner/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function BannerAdminPage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const fetchBanners = async () => {
    const res = await fetch(`${BASE_URL}/api/banners`);
    const data = await res.json();
    setBanners(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return alert('Başlık ve görsel zorunlu');

    setLoading(true);
    await fetch(`${BASE_URL}/api/banners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, imageUrl }),
    });
    setTitle('');
    setImageUrl('');
    setLoading(false);
    fetchBanners();
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎨 Mağaza Tasarımı - Banner Yönetimi</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Banner Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Görsel URL (Cloudinary)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
        >
          {loading ? 'Ekleniyor...' : 'Banner Ekle'}
        </button>
      </form>

      {/* Liste */}
      <div className="mt-6 space-y-4">
        {banners.map((banner: any) => (
          <div key={banner.id} className="flex items-center gap-4 border p-4 rounded bg-white">
            <img src={banner.imageUrl} alt={banner.title} className="w-32 h-20 object-cover rounded" />
            <div>
              <p className="font-semibold">{banner.title}</p>
              <p className="text-sm text-gray-500">{new Date(banner.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
