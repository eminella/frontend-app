import { notFound } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

  return (
    <main className="p-6 max-w-xl mx-auto">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{product.price} ₺</p>

      <button className="w-full p-3 bg-green-600 text-white rounded">
        Sepete Ekle
      </button>
    </main>
  );
}
