'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

type CartItem = Product & { quantity: number };

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const API_URL = 'https://backend-api-rvzd.onrender.com/products';

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Sepete ürün ekle (adet artır)
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Sepetten ürün çıkar (adet azalt)
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Sepetin toplam fiyatı
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Siparişi backend'e gönder
  const handlePlaceOrder = async () => {
    const orderData = {
      items: cart.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      })),
      totalAmount: total,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Siparişiniz başarıyla alındı!');
        setCart([]); // Sepeti temizle
      } else {
        const errorData = await response.json();
        alert(`Sipariş verilirken hata oluştu: ${errorData.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      alert('Sunucuya bağlanılamadı.');
      console.error(error);
    }
  };

  return (
    <main className="p-10 bg-gradient-to-br from-white to-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
          Eminella Mağaza
        </h1>

        {/* 🛒 Sepet */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6 flex items-center gap-3">
            🛒 Sepet
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-lg text-center">Sepetiniz boş</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {item.price.toFixed(2)} ₺
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">
                        {(item.price * item.quantity).toFixed(2)} ₺
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Kaldır
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-right text-xl font-bold text-blue-700">
                Toplam: {total.toFixed(2)} ₺
              </div>
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-yellow-600 text-white py-3 rounded hover:bg-yellow-700 transition"
              >
                Siparişi Onayla
              </button>
            </>
          )}
        </section>

        {/* 🛍️ Ürün Listesi */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product) => {
            const imgSrc = product.imageUrl?.startsWith('/uploads')
              ? `http://localhost:3500${product.imageUrl}`
              : product.imageUrl
              ? `http://localhost:3500/uploads/${product.imageUrl}`
              : '';

            return (
              <article
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-bold text-xl mb-4">{product.price.toFixed(2)} ₺</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
