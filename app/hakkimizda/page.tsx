// frontend-app/app/hakkimizda/page.tsx
'use client';

import Link from 'next/link';

export default function HakkimizdaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-white">
      {/* Breadcrumb */}
      <div className="text-sm text-black mb-6">
        <Link href="/" className="hover:underline">Anasayfa</Link>
        <span className="mx-1">/</span>
        <span className="text-black">Hakkımızda</span>
      </div>

      {/* Sayfa Başlığı */}
      <h1 className="text-3xl font-bold text-black border-b-2 border-red-500 inline-block pb-1 mb-6">
        Hakkımızda
      </h1>

      {/* Bölüm 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">Neden Eminella?</h2>
        <p className="text-black">
          Eminella, şıklığı ve zarafeti bir araya getiren takı & aksesuar markasıdır.
          Müşterilerimize kaliteli ve uygun fiyatlı ürünler sunmayı ilke edindik.
          Kadın takıları, kolyeler, yüzükler ve daha fazlası sizlerle!
        </p>
      </section>

      {/* Bölüm 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">Markanıza Güç Katın</h2>
        <p className="text-black">
          Tasarım odaklı ürünlerimizle tarzınızı yansıtın. Eminella, yalnızca bir takı mağazası değil;
          aynı zamanda şıklığınızı tamamlayan bir stil rehberidir.
        </p>
      </section>

      {/* Bölüm 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-black">Bize Ulaşın</h2>
        <p className="text-black">
          Her türlü sorunuz için <strong>destek@eminella.com</strong> üzerinden bizimle iletişime geçebilirsiniz.
        </p>
      </section>
    </main>
  );
}
