'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [cart, setCart] = useState<Product[]>([]);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch(BASE_URL); // 🔥 Render'ı uyandır
        const res = await fetch(`${BASE_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ HATA:", JSON.stringify(error, null, 2));
      }
      
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-300 pb-2">
          Kategoriler
        </h2>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer px-3 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === cat
                  ? 'bg-green-700 text-white font-semibold shadow'
                  : 'text-gray-800 hover:bg-green-200 hover:text-green-900'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Ana içerik */}
      <main className="flex-1 p-10 bg-gradient-to-br from-white to-yellow-50">
        {/* Sepet */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-yellow-700 mb-6 flex items-center gap-3">
            🛒 Sepet
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center">Sepetiniz boş</p>
          ) : (
            <ul className="divide-y divide-gray-200 max-w-md mx-auto">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between py-3 text-gray-800 text-lg font-medium"
                >
                  <span>{item.name}</span>
                  <span>{item.price.toFixed(2)} ₺</span>
                </li>
              ))}
              <li className="pt-4 text-right font-bold text-yellow-700 text-xl">
                Toplam: {totalPrice.toFixed(2)} ₺
              </li>
            </ul>
          )}
        </section>

        {/* Ürün Listesi */}
        <section className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((p) => {
  const imgSrc = p.imageUrl || '';

  return (
    <div
      key={p.id}
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={p.name}
          className="w-full h-44 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-bold text-gray-800 mb-1">{p.name}</h2>
      <p className="text-gray-600 mb-2">{p.price.toFixed(2)} ₺</p>
      <button
        onClick={() => addToCart(p)}
        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 w-full"
      >
        Sepete Ekle
      </button>
    </div>
  );
})}

        </section>
      </main>
    </div>
  );
}
