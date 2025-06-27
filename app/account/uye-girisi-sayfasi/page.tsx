// frontend-app/app/account/uye-girisi-sayfasi/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UyeGirisiSayfasi() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeMenu, setActiveMenu] = useState('hesabim');

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
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-7xl w-full flex gap-8">
        {/* Sol Menü */}
        <nav className="w-64 bg-white rounded shadow p-6 space-y-4">
          <div className="mb-6 text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => setActiveMenu('hesabim')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeMenu === 'hesabim' ? 'bg-red-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Hesabım
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu('adreslerim')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeMenu === 'adreslerim' ? 'bg-red-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Adreslerim
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu('siparislerim')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeMenu === 'siparislerim' ? 'bg-red-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Siparişlerim
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu('favorilerim')}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeMenu === 'favorilerim' ? 'bg-red-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                Favorilerim
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Çıkış Yap
              </button>
            </li>
          </ul>
        </nav>

        {/* Sağ içerik */}
        <section className="flex-1 bg-white rounded shadow p-6">
          {activeMenu === 'hesabim' && (
            <>
              <h1 className="text-2xl font-bold mb-6">👤 Hesap Bilgileri</h1>
              <div>
                <p><strong>Ad Soyad:</strong> {user.name}</p>
                <p><strong>E-posta:</strong> {user.email}</p>
                <p><strong>Şifre Değiştir:</strong> (henüz aktif değil)</p>
                <p><strong>Siparişlerim:</strong> (henüz aktif değil)</p>
              </div>
            </>
          )}

          {activeMenu === 'adreslerim' && (
            <h1 className="text-2xl font-bold">🏠 Adreslerim</h1>
            // Buraya adres listesi veya formu eklenecek
          )}

          {activeMenu === 'siparislerim' && (
            <h1 className="text-2xl font-bold">📦 Siparişlerim</h1>
            // Buraya sipariş listesi eklenecek
          )}

          {activeMenu === 'favorilerim' && (
            <h1 className="text-2xl font-bold">❤️ Favorilerim</h1>
            // Buraya favoriler eklenecek
          )}
        </section>
      </div>
    </main>
  );
}
