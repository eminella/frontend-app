// frontend-app/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState(1);

  // ... diğer state'leriniz aynı kalabilir

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Kart numarasını sadece rakam ve maksimum 16 hane yapalım
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    // İstersen 4'erli boşluklu format ekleyebilirim, sade hali:
    setCardNumber(value);
  };

  // Son kullanma tarihini MM/YY formatına zorlayalım
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Sadece rakam ve / işareti olabilir, en fazla 5 karakter (MM/YY)
    if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
      if (value.length === 2 && !value.includes('/')) {
        value = value + '/';
      }
      if (value.length > 5) {
        return;
      }
      setExpiryDate(value);
    }
  };

  // CVC sadece 3 rakam
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvc(value);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basit validation örnekleri
    if (cardNumber.length !== 16) {
      alert('Kart numarası 16 hane olmalıdır.');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert('Son kullanma tarihi MM/YY formatında olmalıdır.');
      return;
    }

    if (cvc.length !== 3) {
      alert('CVC 3 haneli olmalıdır.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          customerName: cardName,
          // Diğer adres vs. alanlar da varsa eklenmeli
        }),
      });

      if (!res.ok) throw new Error('Sipariş gönderilemedi');

      clearCart();
      alert('Ödeme başarılı, siparişiniz oluşturuldu!');
      router.push('/store');
    } catch (err) {
      alert('Bir hata oluştu. Sipariş gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      {/* ... Adres formu aynı */}

      {activeTab === 2 && (
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ödeme Bilgileri</h2>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Kart Üzerindeki Ad Soyad *</label>
            <input
              type="text"
              required
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="Kart Üzerindeki Ad Soyad"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Kart Numarası *</label>
            <input
              type="tel"
              inputMode="numeric"
              required
              value={cardNumber}
              onChange={handleCardNumberChange}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="1234123412341234"
              maxLength={16}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-900">Son Kullanma Tarihi (MM/YY) *</label>
              <input
                type="text"
                required
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-900">CVC *</label>
              <input
                type="tel"
                inputMode="numeric"
                required
                value={cvc}
                onChange={handleCvcChange}
                className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? 'İşleniyor...' : 'ÖDEMEYİ TAMAMLA'}
          </button>
        </form>
      )}
    </div>
  );
}
