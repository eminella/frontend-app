'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Giriş işlemi
    router.push('/payment');
  };

  const handleGuestContinue = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="E-posta adresinizi giriniz"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            required
            placeholder="Şifrenizi giriniz"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition"
          >
            GİRİŞ YAP
          </button>
        </form>
        <button
          onClick={handleGuestContinue}
          className="w-full mt-4 bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
        >
          ÜYE OLMADAN DEVAM ET
        </button>
      </div>
    </div>
  );
}
