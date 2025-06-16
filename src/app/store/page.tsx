import Link from 'next/link'; // iç yönlendirme için
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // server-rendered

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  externalUrl?: string;
};

const categories = ['Tümü', 'Kolye', 'Küpe', 'Bileklik', 'Yüzük'];

export default async function StorePage() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  let products: Product[] = [];

  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: 'no-store',
    });
    products = await res.json();
  } catch (err) {
    console.error('❌ Ürünler getirilemedi:', err);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-yellow-50 py-8 px-2">
      {/* Kategoriler */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        {categories.map((cat) => (
          <div
            key={cat}
            className="px-4 py-2 rounded text-sm font-semibold transition-all bg-yellow-700 text-white shadow"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Ürünler */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/store/${p.id}`} // dış link değil, detay sayfası
            className="block group focus:outline-none"
          >
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition cursor-pointer group-hover:scale-105 h-full flex flex-col">
              <img
                src={p.imageUrl || '/default-product.jpg'}
                alt={p.name}
                className="w-full h-44 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                {p.name}
              </h2>
              <p className="text-yellow-700 font-bold text-lg mb-2">
                {p.price.toFixed(2)} ₺
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Versiyon etiketi */}
      <div className="text-center mt-10">
        <p style={{ fontSize: '12px', color: 'gray' }}>
          v0.3.4 - manuel dinamik test ✅
        </p>
      </div>
    </main>
  );
}
