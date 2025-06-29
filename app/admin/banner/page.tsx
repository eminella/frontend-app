'use client';

import { useState } from 'react';

export default function BannerUploadPage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert('Görsel seçin.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banners/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      alert('Banner eklendi!');
    } catch (err) {
      alert('Hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Banner Yükle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık (opsiyonel)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {loading ? 'Yükleniyor...' : 'Yükle'}
        </button>
      </form>
    </div>
  );
}
