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
    <main className="max-w-2xl mx-auto px-4 py-6">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 sm:h-80 object-cover rounded-xl shadow mb-6"
      />

      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-green-700 font-semibold mb-4">{product.price} ₺</p>

      <p className="text-gray-600 mb-6">
        Bu ürün yüksek kalite malzemelerle üretilmiştir. Siparişleriniz aynı gün kargoya verilir.
      </p>

      <button className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700">
        Sepete Ekle
      </button>
    </main>
  );
}
