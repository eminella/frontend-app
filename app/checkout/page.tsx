'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Diğer state’ler...

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login işlemleri
    router.push('/payment');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Register işlemleri
    setTab('login');
  };

  const handleGuestContinue = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow">
        {/* Sekmeler */}
        {/* ... */}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            {/* Login form */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold mb-2 transition"
            >
              GİRİŞ YAP
            </button>
            <button
              type="button"
              onClick={() => window.alert('Google OAuth entegrasyonu…')}
              className="w-full border border-red-600 text-red-600 py-2 rounded font-semibold transition flex items-center justify-center mb-4"
            >
              {/* Google butonu */}
            </button>
            <button
              type="button"
              onClick={handleGuestContinue}
              className="w-full bg-black text-white py-2 rounded font-semibold transition"
            >
              ÜYE OLMADAN DEVAM ET
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            {/* Register form */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
            >
              KAYIT OL
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
