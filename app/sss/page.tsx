// frontend-app/src/app/sss/page.tsx

export default function SSSPage() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Sıkça Sorulan Sorular</h1>
  
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Siparişim ne zaman kargoya verilir?</h2>
            <p className="text-gray-700">Siparişiniz onaylandıktan sonra 1-3 iş günü içinde kargoya verilir. Yoğun dönemlerde bu süre uzayabilir.</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Kargo ücretli mi?</h2>
            <p className="text-gray-700">250 TL ve üzeri alışverişlerde kargo ücretsizdir. Altındaki siparişler için sabit kargo ücreti alınır.</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Ürün iadesi nasıl yapılır?</h2>
            <p className="text-gray-700">Ürünü teslim aldıktan sonra 14 gün içinde iade başvurusu yapabilirsiniz. İade için ürün kullanılmamış ve orijinal ambalajında olmalıdır.</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Hangi ödeme yöntemlerini kabul ediyorsunuz?</h2>
            <p className="text-gray-700">Kredi kartı ve banka kartı ile güvenli ödeme kabul ediyoruz. Kapıda ödeme seçeneğimiz yoktur.</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold text-gray-900">İndirim ve kampanyaları nereden takip edebilirim?</h2>
            <p className="text-gray-700">Sitemizi ve sosyal medya hesaplarımızı takip ederek güncel kampanya ve indirimlerden haberdar olabilirsiniz.</p>
          </div>
        </div>
      </div>
    );
  }
  