'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kayıt işlemi için API çağrısı burada yapılacak
    alert('Kayıt işlemi yapıldı (örnek)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Kayıt Ol</h2>
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
