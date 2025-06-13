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
      console.error("Ürünler çekilemedi", err);
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
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image); // 👈 burada image tipinin File olduğundan emin ol
  
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("HATA:", errorText);
        alert("Ürün eklenemedi");
        return;
      }
  
      const data = await res.json();
      console.log("✅ Ürün eklendi:", data);
  
      // Formu temizle
      setName('');
      setPrice('');
      setImage(null);
  
      // Ürünleri tekrar getir
      fetchProducts();
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
    }
  };
  
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Ürün Yönetimi</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Ürün Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Kaydet
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Ürünler</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded flex items-center gap-4">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover" />
            )}
            <div>
              <p className="font-bold">{product.name}</p>
              <p>{product.price} ₺</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
