'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Burada login işlemi yapılır
    alert(`Giriş yapıldı: ${email}`);
    router.push('/store'); // Giriş sonrası yönlendirme
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-sm w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
        <input
          type="email"
          placeholder="E-posta adresi"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
