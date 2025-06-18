export const dynamic = "force-dynamic";

'use client';

import { useState, useEffect } from 'react';

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

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Ürünler çekilemedi:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Sunucu hatası");

      const newProduct = await res.json();
      setProducts((prev) => [newProduct, ...prev]);

      setName('');
      setPrice('');
      setImage(null);
      (document.getElementById("imageInput") as HTMLInputElement).value = "";

      alert("✅ Ürün başarıyla eklendi!");
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      alert("❌ Bir hata oluştu.");
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Ürün Yönetimi</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 mb-10 space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ürün adı"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Fiyat"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />

          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="border border-gray-300 rounded px-4 py-2 w-full bg-white"
          />

          <button
            type="submit"
            className="bg-yellow-700 hover:bg-yellow-800 text-white font-semibold px-6 py-2 rounded"
          >
            Kaydet
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ürünler</h2>
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-bold text-gray-800">{product.name}</p>
                <p className="text-yellow-700">{product.price} ₺</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
