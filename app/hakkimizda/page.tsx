// frontend-app/app/hakkimizda/page.tsx
export default function HakkimizdaPage() {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 border-b pb-2">Hakkımızda</h1>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Neden Eminella?</h2>
          <p className="text-gray-700">
            Eminella, şıklığı ve zarafeti bir araya getiren takı & aksesuar markasıdır.
            Müşterilerimize kaliteli ve uygun fiyatlı ürünler sunmayı ilke edindik.
            Kadın takıları, kolyeler, yüzükler ve daha fazlası sizlerle!
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Markanıza Güç Katın</h2>
          <p className="text-gray-700">
            Tasarım odaklı ürünlerimizle tarzınızı yansıtın. Eminella, yalnızca bir takı mağazası değil;
            aynı zamanda şıklığınızı tamamlayan bir stil rehberidir.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Bize Ulaşın</h2>
          <p className="text-gray-700">
            Her türlü sorunuz için <strong>destek@eminella.com</strong> üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </section>
      </div>
    );
  }
  