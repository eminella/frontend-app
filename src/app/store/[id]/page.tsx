// src/app/store/[id]/page.tsx

type Params = { id: string };

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { id } = params;

  // Burada API çağrısı yapabilirsin, örnek:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { cache: 'no-store' });
  // const product = await res.json();

  // Demo ürün
  const product = { name: "Deneme Ürün", price: 199, description: "Bu ürün çok kaliteli." };

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl text-yellow-700 font-semibold mb-6">{product.price} ₺</p>
      <p className="mb-6 text-gray-700">{product.description}</p>
    </main>
  );
}
