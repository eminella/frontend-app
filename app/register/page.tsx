// frontend-app/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Kayıt başarılı!');
        router.push('/login');
      } else {
        alert(data.error || 'Kayıt başarısız');
      }
    } catch (err) {
      console.error('Kayıt hatası:', err);
      alert('Sunucu hatası');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Kayıt Ol</h2>
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded text-gray-900"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
