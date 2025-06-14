// src/app/store/[id]/page.tsx

type Params = { id: string };

// Artık sadece Promise bekliyor!
export default async function Page({ params }: any) {
  const { id } = await params;

  // Burada ürünü API'dan çekebilirsin
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  // const product = await res.json();

  // Demo ürün:
  const product = { name: "Deneme Ürün", price: 199 };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-green-700 font-semibold mb-4">{product.price} ₺</p>
      <p className="text-gray-600 mb-6">
        Bu ürün yüksek kalite malzemelerle üretilmiştir.
      </p>
      <button className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700">
        Sepete Ekle
      </button>
    </main>
  );
}
