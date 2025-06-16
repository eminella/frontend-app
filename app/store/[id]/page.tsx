import { notFound } from 'next/navigation';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  const res = await fetch(`${BASE_URL}/products/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const product: Product = await res.json();

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <img
        src={product.imageUrl || '/default-product.jpg'}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h1>
      <p className="text-xl text-yellow-700 font-semibold mb-4">
        {product.price.toFixed(2)} ₺
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Kategori: <span className="font-medium">{product.category}</span>
      </p>
      <p className="text-gray-700 mb-6">
        Bu ürün en kaliteli malzemeler kullanılarak üretilmiştir. Günlük
        kullanıma uygundur. Alkol, parfüm gibi maddelerden uzak tutunuz.
      </p>

      {/* Geri dön linki */}
      <Link
        href="/store"
        className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
      >
        ← Ürün listesine dön
      </Link>
    </main>
  );
}
