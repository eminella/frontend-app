'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

type CartItem = Product & { quantity: number };

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';
  const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch(BASE_URL);
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('❌ Backend bağlantı hatası:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.18;
  const totalPriceWithTax = totalPrice + totalPrice * taxRate;

  const handleOrder = async () => {
    if (!customerName || !address || !phone) {
      alert('Lütfen tüm müşteri bilgilerini doldurun.');
      return;
    }
    if (cart.length === 0) {
      alert('Sepetiniz boş.');
      return;
    }

    const items = cart.map((item) => ({ productId: item.id, quantity: item.quantity }));

    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          address,
          phone,
          items,
          totalAmount: totalPriceWithTax,
        }),
      });

      if (res.ok) {
        alert('✅ Sipariş başarıyla oluşturuldu!');
        clearCart();
        setCustomerName('');
        setAddress('');
        setPhone('');
      } else {
        alert('❌ Sipariş oluşturulamadı!');
      }
    } catch (error) {
      alert('🚫 Sunucu hatası!');
      console.error(error);
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mağaza</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Kategoriler (Sol) */}
        <aside className="w-full md:w-1/4 space-y-6 order-1 md:order-none">
          <div className="overflow-x-auto">
            <div className="flex gap-2 w-max min-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded ${
                    selectedCategory === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Ürünler (Orta) */}
        <div className="w-full md:w-2/4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Bu kategoride ürün bulunamadı.
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <Link href={`/store/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold">{product.name}</h3>
                  <p className="text-gray-700">{product.price} ₺</p>
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-2 p-2 bg-green-600 text-white rounded"
                >
                  Sepete Ekle
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sepet (Sağ) */}
        <aside className="w-full md:w-1/4 space-y-6 order-0 md:order-last">
          <div className="bg-yellow-50 p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-bold mb-2">🛒 Sepet ({cart.length})</h2>
            {cart.length === 0 ? (
              <p>Sepetiniz boş.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm">{item.price} ₺ x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-14 text-center border rounded"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {/* Sipariş Formu */}
      {cart.length > 0 && (
        <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Müşteri Bilgileri</h2>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Adres"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />

          <div className="text-right font-semibold mb-4">
            <p>Ara Toplam: {totalPrice.toFixed(2)} ₺</p>
            <p>KDV (%18): {(totalPrice * taxRate).toFixed(2)} ₺</p>
            <p className="text-xl font-bold">Toplam: {totalPriceWithTax.toFixed(2)} ₺</p>
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Siparişi Tamamla
          </button>
        </div>
      )}
    </main>
  );
}
