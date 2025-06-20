'use client';

import { useState } from 'react';

export default function PaymentPage() {
  // Form state
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Form verisini backend'e gönder
    alert('Adres bilgileri kaydedildi!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="font-bold text-lg mb-6">Yeni Adres Ekle</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fatura Türü */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Fatura Türü</label>
          <select
            value={invoiceType}
            onChange={(e) => setInvoiceType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>Bireysel Adres</option>
            <option>Kurumsal Adres</option>
          </select>
        </div>

        {/* E-Mail */}
        <div>
          <label className="block mb-1 text-sm font-semibold">E-Mail Adresiniz *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="example@mail.com"
          />
        </div>

        {/* Ad Soyad */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Ad Soyad *</label>
          <input
            type="text"
            value={nameSurname}
            onChange={(e) => setNameSurname(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Adınız Soyadınız"
          />
        </div>

        {/* Ülke */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Ülke Seçiniz</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>Türkiye</option>
            {/* İstersen diğer ülkeleri ekle */}
          </select>
        </div>

        {/* İl */}
        <div>
          <label className="block mb-1 text-sm font-semibold">İl Seçiniz *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="İl"
          />
        </div>

        {/* İlçe */}
        <div>
          <label className="block mb-1 text-sm font-semibold">İlçe *</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="İlçe"
          />
        </div>

        {/* Mahalle */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Mahalle *</label>
          <input
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Mahalle"
          />
        </div>

        {/* Adres */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-semibold">Adres</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Adresinizi giriniz"
          />
        </div>

        {/* Posta Kodu */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Posta Kodu</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Posta Kodu"
          />
        </div>

        {/* Cep Telefonu */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Cep Telefonu *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="+90 5xx xxx xx xx"
          />
        </div>

        {/* Fatura farklı adres checkbox */}
        <div className="md:col-span-2 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={invoiceDifferentAddress}
            onChange={(e) => setInvoiceDifferentAddress(e.target.checked)}
            id="invoiceDiffAddress"
            className="form-checkbox"
          />
          <label htmlFor="invoiceDiffAddress" className="text-sm">
            Faturamın farklı bir adrese düzenlenmesini istiyorum
          </label>
        </div>

        {/* Kaydet Butonu */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            ADRESİ KAYDET
          </button>
        </div>
      </form>
    </div>
  );
}
