'use client';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// ...devam

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

type CartItem = Product & { quantity: number };

const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

export default function StorePage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Geçersiz ürün verisi');
        setProducts(data);
      } catch (err) {
        console.error('❌ Ürünler getirilemedi:', err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalAmount: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          customerName: 'Deneme Müşteri',
          address: 'İstanbul',
          phone: '05555555555',
        }),
      });

      if (!res.ok) throw new Error('Sipariş oluşturulamadı!');
      alert('✅ Sipariş başarıyla alındı!');
      setCart([]);
    } catch (err) {
      alert('❌ Sipariş başarısız oldu!');
      console.error(err);
    }
  };

  const filteredProducts = Array.isArray(products)
    ? selectedCategory === 'Tümü'
      ? products
      : products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">
      {/* Kategoriler */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded text-sm font-semibold transition-all shadow ${
              selectedCategory === cat
                ? 'bg-yellow-700 text-white'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ürünler */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition cursor-pointer hover:scale-105 h-full flex flex-col"
          >
            <Link href={`/store/${p.id}`}>
  <img
    src={p.imageUrl}
    alt={p.name}
    className="w-full h-40 object-cover rounded-lg mb-2"
  />
  <h2 className="text-lg font-bold text-gray-800 mb-1">{p.name}</h2>
  <p className="text-yellow-700 font-bold text-lg mb-2">
    {p.price.toFixed(2)} ₺
  </p>
</Link>

            <button
              onClick={() => addToCart(p)}
              className="mt-auto bg-yellow-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>

      {/* Sepet */}
      <div className="bg-white rounded-xl shadow p-4 mt-10 max-w-2xl mx-auto">
        <h3 className="text-lg font-bold mb-2">🛒 Sepet</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Sepet boş</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>
                  {(item.price * item.quantity).toFixed(2)} ₺
                </span>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">
              Toplam:{' '}
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}{' '}
              ₺
            </p>
            <button
              onClick={handleCheckout}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full"
            >
              Siparişi Tamamla
            </button>
          </div>
        )}
      </div>

      {/* Versiyon etiketi */}
      <div className="text-center mt-10">
        <p className="text-xs text-gray-400">v0.3.5 - sepet ve sipariş aktif</p>
      </div>
    </main>
  );
}
