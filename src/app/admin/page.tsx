'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

export default function AdminPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeMenu, setActiveMenu] = useState('products');

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;


  // Ürünleri getir
  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Ürün Ekleme
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert('Tüm alanları doldurun.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      // @ts-ignore
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Ürün eklendi!');
        setName('');
        setPrice('');
        setImage(null);
        fetchProducts();
      } else {
        const error = await response.json();
        alert(`Hata: ${error.error || 'Bir sorun oluştu.'}`);
      }
    } catch (err) {
      console.error('İstek hatası:', err);
      alert('Sunucuya bağlanılamadı.');
    }
  };

  // Ürün Silme
  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istediğine emin misin?')) return;

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) fetchProducts();
    else alert('Silinemedi.');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-700 border-b">Eminella Admin</div>
        <nav className="flex flex-col mt-6 space-y-1 flex-grow">
          <button
            onClick={() => setActiveMenu('products')}
            className={`px-6 py-3 text-left hover:bg-blue-100 transition ${
              activeMenu === 'products' ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'
            }`}
          >
            Ürünler
          </button>
          <button
            onClick={() => setActiveMenu('orders')}
            className={`px-6 py-3 text-left hover:bg-blue-100 transition ${
              activeMenu === 'orders' ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'
            }`}
          >
            Siparişler
          </button>
          <button
            onClick={() => setActiveMenu('settings')}
            className={`px-6 py-3 text-left hover:bg-blue-100 transition ${
              activeMenu === 'settings' ? 'bg-blue-100 font-semibold text-blue-700' : 'text-gray-700'
            }`}
          >
            Ayarlar
          </button>
        </nav>
        <div className="p-6 border-t text-gray-500 text-sm">&copy; 2025 Eminella</div>
      </aside>

      {/* Ana içerik */}
      <main className="flex-1 p-10 overflow-auto">
        {activeMenu === 'products' && (
          <>
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Ürün Yönetimi</h1>
            {/* Ürün Ekleme Formu */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
            >
              <input
                type="text"
                name="name"
                placeholder="Ürün adı"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border rounded text-gray-800"
              />
              <input
                type="text"
                name="price"
                placeholder="Fiyat"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-3 border rounded text-gray-800"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="p-3 border rounded bg-white file:text-sm text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Kaydet
              </button>
            </form>

            {/* Ürün Listesi */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Ürünler</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {p.imageUrl && (
                        <img
                          src={`http://localhost:3500${p.imageUrl}`}
                          alt={p.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-bold text-gray-900">{p.name}</p>
                        <p className="text-gray-600 text-sm">{p.price} ₺</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeMenu === 'orders' && (
          <div className="p-4 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Sipariş Yönetimi</h1>
            <p>Henüz siparişler sayfası yapılmadı.</p>
          </div>
        )}

        {activeMenu === 'settings' && (
          <div className="p-4 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Ayarlar</h1>
            <p>Burada admin ayarları olur.</p>
          </div>
        )}
      </main>
    </div>
  );
}
