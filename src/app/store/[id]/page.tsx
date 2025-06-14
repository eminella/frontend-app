// /src/app/store/[id]/page.tsx

type PageProps = {
  params: { id: string }
};

export default async function Page({ params }: PageProps) {
  // Eğer params bir Promise ise, çözülmesini bekle
  // Next.js 15+'da bazen Promise olabiliyor!
  const realParams = await (params as any);

  const id = realParams?.id || params.id;

  // Burada API'den ürünü çekiyorsun (örnek)
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  // const product = await res.json();

  // Fake örnek:
  const product = {
    name: "Deneme Ürün",
    price: 199,
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-green-700 font-semibold mb-4">{product.price} ₺</p>
      <p className="text-gray-600 mb-6">Bu ürün yüksek kalite malzemelerle üretilmiştir.</p>
      <button className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700">
        Sepete Ekle
      </button>
    </main>
  );
}
