// frontend-app/app/bize-ulasin/page.tsx
'use client';

import { useState } from 'react';

export default function BizeUlasinPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // İsteğe bağlı: Backend'e gönderme işlemi burada yapılabilir
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Bize Ulaşın</h1>

      {submitted ? (
        <p className="text-green-600 font-semibold">Mesajınız alınmıştır. En kısa sürede dönüş yapacağız.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ad Soyad *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
              placeholder="Adınız ve Soyadınız"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta Adresiniz *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mesajınız *</label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
              placeholder="Mesajınızı buraya yazın..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-semibold"
          >
            Gönder
          </button>
        </form>
      )}
    </div>
  );
}
