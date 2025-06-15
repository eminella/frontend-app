// src/app/store/[id]/page.tsx

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Örneğin: API'den veri çekmek için şöyle kullanabilirsin
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  // const product = await res.json();

  // Demo sabit ürün
  const product = { name: "Deneme Ürün", price: 199 };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-green-700 font-semibold mb-4">{product.price} ₺</p>
      <p className="text-gray-600 mb-6">Bu ürün yüksek kalite malzemelerle üretilmiştir.</p>
    </main>
  );
}
