'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

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
        const res = await fetch(`${BASE_URL}/api/products`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Geçersiz ürün verisi');
        setProducts(data);
      } catch (err) {
        console.error('❌ Ürünler getirilemedi:', err);
      }
    };
    fetchProducts();
  }, [BASE_URL]);

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
          totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
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

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">

      {/* Kategoriler - TRT tarzı menü */}
      <div className="bg-gray-100 py-3 px-4 rounded-xl shadow-sm mb-10 max-w-5xl mx-auto overflow-x-auto">
        <div className="flex gap-6 justify-center flex-wrap text-sm font-semibold text-gray-700">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`transition px-2 pb-1 border-b-2 ${
                selectedCategory === cat
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent hover:border-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün Kartları */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            imageUrl={p.imageUrl}
            onAddToCart={() => addToCart(p)}
          />
        ))}
      </div>

      {/* Sepet Alanı */}
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
                <span>{(item.price * item.quantity).toFixed(2)} ₺</span>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">
              Toplam:{' '}
              {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} ₺
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
        <p className="text-xs text-gray-400">v0.3.7 - TRT Market kategori menüsü</p>
      </div>
    </main>
  );
}
