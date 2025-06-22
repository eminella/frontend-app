'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState(1);

  const [invoiceType, setInvoiceType] = useState('Bireysel Adres');
  const [email, setEmail] = useState('');
  const [nameSurname, setNameSurname] = useState('');
  const [country, setCountry] = useState('Türkiye');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [invoiceDifferentAddress, setInvoiceDifferentAddress] = useState(false);

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [loading, setLoading] = useState(false);

  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Adres kaydedildi, ödeme sekmesine geçiliyor');
    setActiveTab(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          customerName: nameSurname,
          address: `${neighborhood}, ${district}, ${city}`,
          phone,
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
      <div className="flex border-b mb-6">
        <button
          className={`flex-1 py-2 font-semibold text-center ${
            activeTab === 1 ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Adres Bilgileri
        </button>
        <button
          className={`flex-1 py-2 font-semibold text-center ${
            activeTab === 2 ? 'border-b-4 border-red-600 text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
          onClick={() => setActiveTab(2)}
          disabled={activeTab === 1}
        >
          Ödeme Bilgileri
        </button>
      </div>

      {/* Adres Formu */}
      {activeTab === 1 && (
        <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ...adres alanları aynı kalıyor... */}
          {/* Burayı değiştirmiyoruz */}
          {/* ... */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
            >
              ADRESİ KAYDET
            </button>
          </div>
        </form>
      )}

      {/* Ödeme Formu */}
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
              type="text"
              required
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-900">Son Kullanma Tarihi *</label>
              <input
                type="text"
                required
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
                placeholder="AA/YY"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-900">CVC *</label>
              <input
                type="text"
                required
                value={cvc}
                onChange={e => setCvc(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
                placeholder="***"
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
