'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Giriş formu submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Giriş işlemi
    router.push('/payment');
  };

  // Google OAuth placeholder
  const handleGoogleLogin = () => {
    alert('Google OAuth entegrasyonu yakında gelecek');
  };

  // Üye olmadan devam
  const handleGuestContinue = () => {
    router.push('/payment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        {/* Sekmeler */}
        <div className="flex mb-6 border-b border-gray-200">
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
            ÜYE OL
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              placeholder="E-posta adresinizi giriniz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
            />
            <input
              type="password"
              required
              placeholder="Şifrenizi giriniz"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 relative"
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="form-checkbox rounded"
                />
                <span>Beni Hatırla</span>
              </label>
              <a href="#" className="text-red-600 hover:underline">
                Şifremi Unuttum
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
            >
              GİRİŞ YAP
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-red-600 text-red-600 py-3 rounded font-semibold transition flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
              >
                <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95.3h146.9c-6.3 34-25.3 62.8-54.3 82v68h87.7c51.2-47.1 80.7-116.6 80.7-194z"/>
                <path fill="#34A853" d="M272 544.3c73 0 134.3-24.1 179.1-65.3l-87.7-68c-24.3 16.3-55.5 25.9-91.3 25.9-70.3 0-130-47.5-151.4-111.3H30.4v69.9C74.8 486.2 166 544.3 272 544.3z"/>
                <path fill="#FBBC05" d="M120.6 323.6c-5-15-7.9-31-7.9-47.6s2.9-32.6 7.9-47.6v-69.9H30.4C10.6 218.3 0 243.8 0 271s10.6 52.7 30.4 91.5l90.2-69.9z"/>
                <path fill="#EA4335" d="M272 107.7c39.6 0 75.1 13.6 103.1 40.4l77.3-77.3C403.6 24.1 342.2 0 272 0 166 0 74.8 58.1 30.4 144.3l90.2 69.9c21.4-63.8 81.1-111.3 151.4-111.3z"/>
              </svg>
              Google ile bağlan
            </button>
            <button
              type="button"
              onClick={handleGuestContinue}
              className="w-full mt-4 bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
            >
              ÜYE OLMADAN DEVAM ET
            </button>
          </form>
        ) : (
          // ÜYE OL sekmesi içerikleri (isteğe bağlı doldurabilirsin)
          <div className="text-center text-gray-600">Üye olma formu burada olacak.</div>
        )}
      </div>
    </div>
  );
}
