'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeMenu, setActiveMenu] = useState<'hesabim' | 'adreslerim' | 'siparislerim' | 'favorilerim'>('hesabim');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) return <p className="p-8 text-center">Yükleniyor...</p>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <main className="min-h-screen flex gap-6 p-6 bg-gray-100">
      {/* Menü */}
      <nav className="w-64 bg-white rounded shadow p-6 flex flex-col gap-3">
        <button
          onClick={() => setActiveMenu('hesabim')}
          className={`text-left p-2 rounded font-semibold ${activeMenu === 'hesabim' ? 'bg-red-600 text-white' : ''}`}
        >
          Hesabım
        </button>
        <button
          onClick={() => setActiveMenu('adreslerim')}
          className={`text-left p-2 rounded font-semibold ${activeMenu === 'adreslerim' ? 'bg-red-600 text-white' : ''}`}
        >
          Adreslerim
        </button>
        <button
          onClick={() => setActiveMenu('siparislerim')}
          className={`text-left p-2 rounded font-semibold ${activeMenu === 'siparislerim' ? 'bg-red-600 text-white' : ''}`}
        >
          Siparişlerim
        </button>
        <button
          onClick={() => setActiveMenu('favorilerim')}
          className={`text-left p-2 rounded font-semibold ${activeMenu === 'favorilerim' ? 'bg-red-600 text-white' : ''}`}
        >
          Favorilerim
        </button>
        <button
          onClick={handleLogout}
          className="mt-auto text-left p-2 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white transition"
        >
          Çıkış Yap
        </button>
      </nav>

      {/* İçerik */}
      <section className="flex-1 bg-white rounded shadow p-6">
        {activeMenu === 'hesabim' && (
          <>
            <h1 className="text-3xl font-bold mb-4">👤 Hesap Bilgileri</h1>
            <p><strong>Ad Soyad:</strong> {user.name}</p>
            <p><strong>E-posta:</strong> {user.email}</p>
            <p className="mt-4 text-gray-500">Şifre Değiştir (henüz aktif değil)</p>
            <p className="text-gray-500">Siparişlerim (henüz aktif değil)</p>
          </>
        )}

        {activeMenu === 'adreslerim' && <h1 className="text-3xl font-bold">Adreslerim</h1>}
        {activeMenu === 'siparislerim' && <h1 className="text-3xl font-bold">Siparişlerim</h1>}
        {activeMenu === 'favorilerim' && <h1 className="text-3xl font-bold">Favorilerim</h1>}
      </section>
    </main>
  );
}
