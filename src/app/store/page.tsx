'use client';

import { useEffect, useState } from 'react';

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
        await fetch(BASE_URL); // Render'ı uyandır
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        console.log("🟢 Gelen veri:", data);
        setProducts(data);
      } catch (error) {
        console.error('Backend bağlantı hatası:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'Tümü'
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

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
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

    const productIds = cart.map((item) => item.id);
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
          productIds,
        }),
      });

      if (res.ok) {
        alert('Sipariş başarıyla oluşturuldu!');
        clearCart();
        setCustomerName('');
        setAddress('');
        setPhone('');
      } else {
        alert('Sipariş oluşturulamadı!');
      }
    } catch (error) {
      alert('Sunucu hatası!');
      console.error('Sipariş oluşturma hatası:', error);
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mağaza</h1>

      <div className="mb-6 overflow-x-auto">
  <div className="flex gap-3 w-max min-w-full">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`whitespace-nowrap px-4 py-2 rounded ${
          selectedCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-200'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
</div>


      {filteredProducts.length === 0 && <p>Bu kategoride ürün bulunamadı.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-blue-600 font-bold mt-1">{product.price.toFixed(2)} TL</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 bg-green-600 text-white px-4 py-1 rounded"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold mb-4">🛒 Sepet ({totalQuantity} ürün)</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Sepetiniz boş.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p>
                        {item.price.toFixed(2)} TL x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) updateQuantity(item.id, val);
                      }}
                      className="w-16 text-center border rounded"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 rounded"
                      title="Ürünü kaldır"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-right">
              <p className="font-semibold">Ara Toplam: {totalPrice.toFixed(2)} TL</p>
              <p className="font-semibold">KDV (%18): {(totalPrice * taxRate).toFixed(2)} TL</p>
              <p className="text-xl font-bold">Genel Toplam: {totalPriceWithTax.toFixed(2)} TL</p>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={clearCart}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Sepeti Boşalt
              </button>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border rounded-md bg-white shadow max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Müşteri Bilgileri</h3>

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

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            🛒 Siparişi Tamamla
          </button>
        </div>
      )}

      {/* DEBUG: Sepet içeriği */}
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </main>
  );
}
