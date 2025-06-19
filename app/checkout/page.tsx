// frontend-app/app/checkout/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const router = useRouter();

  const [guest, setGuest] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const API = process.env.NEXT_PUBLIC_API_URL;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async () => {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        totalAmount,
        customerName: guest ? name : null,
        address: guest ? address : null,
        phone: guest ? phone : null,
      }),
    });

    if (res.ok) {
      localStorage.removeItem('eminellaCart');
      router.push('/success');
    } else {
      alert('❌ Sipariş oluşturulamadı!');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Siparişi Tamamla</h1>

      {!guest && (
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setGuest(true)}
        >
          Üye Olmadan Devam Et
        </button>
      )}

      {guest && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOrder();
          }}
        >
          <input
            className="block mb-2 w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad Soyad"
            required
          />
          <input
            className="block mb-2 w-full p-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Adres"
            required
          />
          <input
            className="block mb-4 w-full p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded"
          >
            Siparişi Gönder
          </button>
        </form>
      )}
    </div>
  );
}
