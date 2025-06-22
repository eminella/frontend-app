'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState(1); // 1: Adres, 2: Ödeme

  // Adres bilgileri
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

  // Ödeme bilgileri
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
      {/* Sekme butonları */}
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
          {/* Adres inputları */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Fatura Türü</label>
            <select
              value={invoiceType}
              onChange={e => setInvoiceType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
            >
              <option>Bireysel Adres</option>
              <option>Kurumsal Adres</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">E-Mail Adresiniz *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Ad Soyad *</label>
            <input
              type="text"
              required
              value={nameSurname}
              onChange={e => setNameSurname(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="Adınız Soyadınız"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Ülke</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
            >
              <option>Türkiye</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">İl *</label>
            <input
              type="text"
              required
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="İl"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">İlçe *</label>
            <input
              type="text"
              required
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="İlçe"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Mahalle *</label>
            <input
              type="text"
              required
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="Mahalle"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-semibold text-gray-900">Adres</label>
            <textarea
              rows={3}
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="Adresinizi giriniz"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Posta Kodu</label>
            <input
              type="text"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="Posta Kodu"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Cep Telefonu *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-semibold text-gray-900"
              placeholder="+90 5xx xxx xx xx"
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={invoiceDifferentAddress}
              onChange={e => setInvoiceDifferentAddress(e.target.checked)}
              id="invoiceDiffAddress"
              className="form-checkbox"
            />
            <label htmlFor="invoiceDiffAddress" className="text-sm text-gray-900">
              Faturamın farklı bir adrese düzenlenmesini istiyorum
            </label>
          </div>
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
          <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-900">Kart Üzerindeki Ad Soyad *</label>
            <input
              type="text"
              required
              value={nameSurname}
              onChange={e => setNameSurname(e.target.value)}
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
