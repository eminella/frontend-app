'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basit validasyon
    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    // TODO: Ödeme entegrasyonu yapılacak

    alert('Ödeme işlemi başarıyla tamamlandı!');
    router.push('/order-success'); // Başarılı sayfası varsa yönlendir
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Ödeme Bilgileri</h2>

        <label className="block mb-2 font-medium">Kart Sahibinin Adı</label>
        <input
          type="text"
          value={cardName}
          onChange={e => setCardName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="Ad Soyad"
          required
        />

        <label className="block mb-2 font-medium">Kart Numarası</label>
        <input
          type="text"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
          placeholder="0000 0000 0000 0000"
          maxLength={19}
          required
        />

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium">Son Kullanma Tarihi</label>
            <input
              type="text"
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-medium">CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={e => setCvv(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
        >
          Ödemeyi Tamamla
        </button>
      </form>
    </div>
  );
}
