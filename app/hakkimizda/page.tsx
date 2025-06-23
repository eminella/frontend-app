// frontend-app/app/hakkimizda/page.tsx
'use client';

import Link from 'next/link';

export default function HakkimizdaPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 bg-white text-black">
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <Link href="/" className="hover:underline">Anasayfa</Link>
        <span className="mx-1">/</span>
        <span>Hakkımızda</span>
      </div>

      {/* Sayfa Başlığı */}
      <h1 className="text-3xl font-bold border-b-2 border-red-500 inline-block pb-1 mb-6">
        Hakkımızda
      </h1>

      {/* Bölüm 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Neden Eminella?</h2>
        <p>
          Eminella, zarafeti ve günlük şıklığı bir araya getiren özel tasarım takı ve aksesuar markasıdır.
          Kaliteyi uygun fiyata sunma ilkemizle, modayı takip eden ama kendi stilini yaratan kadınların yanındayız.
        </p>
      </section>

      {/* Bölüm 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tarzınıza Değer Katın</h2>
        <p>
          Sadece bir takı değil; bir duruş, bir tarz sunuyoruz. Her parça, kombinlerinizi tamamlayan bir dokunuş.
          Eminella ile stilinizi yansıtın.
        </p>
      </section>

      {/* Bölüm 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Bize Ulaşın</h2>
        <p>
          Tüm sorularınız için <strong>destek@eminella.com</strong> adresinden bizimle iletişime geçebilirsiniz.
        </p>
      </section>
    </main>
  );
}
