// app/store/[id]/page.tsx

import { notFound } from 'next/navigation';

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
    <main className="p-6 max-w-xl mx-auto">
      <img
        src={product.imageUrl || '/default-product.jpg'}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-yellow-700 font-semibold mb-4">
        {product.price.toFixed(2)} ₺
      </p>
      <p className="text-gray-600">
        Bu ürün yüksek kalite malzemelerle üretilmiştir. Kategori:{" "}
        <span className="font-medium">{product.category}</span>
      </p>
    </main>
  );
}
