'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// ...devam


export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basit doğrulama
    if (!email || !password) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    // Burada gerçek backend login endpoint'inizi çağırın
    // Örnek:
    /*
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Giriş başarısız');
    }
    */

    // Şimdilik demo amaçlı:
    if (email === 'admin@example.com' && password === '123456') {
      router.push('/admin');
    } else {
      alert('Hatalı giriş bilgileri.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full"
      >
        <img src="/logo.png" alt="Admin Logo" className="mx-auto mb-6 w-24" />
        <h2 className="text-2xl font-bold text-center mb-6">Yönetici Paneline Hoş geldiniz</h2>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
