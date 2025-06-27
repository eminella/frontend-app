// frontend-app/app/account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

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

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded shadow space-y-6">
        <h1 className="text-3xl font-bold mb-6">👤 Hesap Bilgileri</h1>

        <div>
          <strong>Ad Soyad:</strong> <span>{user.name}</span>
        </div>
        <div>
          <strong>E-posta:</strong> <span>{user.email}</span>
        </div>
        <div>
          <strong>Şifre Değiştir</strong> (henüz aktif değil)
        </div>
        <div>
          <strong>Siparişlerim</strong> (henüz aktif değil)
        </div>
      </div>
    </main>
  );
}
