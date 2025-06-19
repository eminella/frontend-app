// frontend-app/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: next-auth veya kendi auth servisine POST
    console.log('login', { email, password, remember });
    router.push('/payment'); // giriş başarılıysa yönlendir
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      alert('Şifreler eşleşmiyor');
      return;
    }
    // TODO: kayıt servisine POST
    console.log('register', { regEmail, regPassword });
    setTab('login');
    alert('Kayıt başarılı, şimdi giriş yapabilirsiniz');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow">
        {/* Sekmeler */}
        <div className="mb-6 flex border-b border-gray-200">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 pb-2 text-center font-semibold transition ${
              tab === 'login'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ÜYE GİRİŞ
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 pb-2 text-center font-semibold transition ${
              tab === 'register'
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ÜYE KAYIT
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              required
              placeholder="E-posta adresinizi giriniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              required
              placeholder="Şifrenizi giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="flex items-center justify-between mb-4 text-sm">
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="form-checkbox"
                />
                <span>Beni Hatırla</span>
              </label>
              <a href="#" className="text-red-600 hover:underline">
                Şifremi Unuttum
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold mb-2 transition"
            >
              GİRİŞ YAP
            </button>
            <button
              type="button"
              onClick={() => window.alert('Google OAuth entegrasyonu…')}
              className="w-full border border-red-600 text-red-600 py-2 rounded font-semibold transition flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Google logosunu SVG olarak ekleyebilirsiniz */}
                <path fill="#4285F4" d="M533.5 278.4..." />
              </svg>
              Google ile bağlan
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              type="email"
              required
              placeholder="E-posta adresinizi giriniz"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="block w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              required
              placeholder="Şifrenizi giriniz"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              className="block w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              required
              placeholder="Şifrenizi tekrar giriniz"
              value={regConfirm}
              onChange={(e) => setRegConfirm(e.target.value)}
              className="block w-full mb-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            />
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
