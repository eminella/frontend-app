// frontend-app/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Giriş başarısız');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/store');

    } catch (err) {
      setError('Sunucuya bağlanılamadı');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="max-w-sm w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Giriş Yap</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="E-posta adresi"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded font-semibold text-gray-900"
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded font-semibold text-gray-900"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 font-bold"
        >
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
