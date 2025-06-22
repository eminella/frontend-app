// frontend-app/app/cerez-politikasi/page.tsx

export default function CerezPolitikasiPage() {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Çerez Politikamız
        </h1>
  
        <p className="mb-4 text-gray-700">
          Eminella olarak web sitemizde sizlere daha iyi hizmet sunabilmek için çerezler kullanmaktayız. Bu çerez politikamızda, hangi çerezleri kullandığımızı, ne için kullandığımızı ve bu çerezleri nasıl kontrol edebileceğinizi açıklamaktayız.
        </p>
  
        <h2 className="text-xl font-semibold mb-2 mt-6 text-gray-800">1. Çerez Nedir?</h2>
        <p className="mb-4 text-gray-700">
          Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza veya cihazınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar sayesinde sitemizi daha verimli ve kişiselleştirilmiş hale getirebiliriz.
        </p>
  
        <h2 className="text-xl font-semibold mb-2 mt-6 text-gray-800">2. Kullandığımız Çerezler</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Oturum çerezleri (geçici)</li>
          <li>Kalıcı çerezler</li>
          <li>Analitik çerezler</li>
          <li>Reklam çerezleri</li>
          <li>Fonksiyonel çerezler</li>
        </ul>
  
        <h2 className="text-xl font-semibold mb-2 mt-6 text-gray-800">3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
        <p className="mb-4 text-gray-700">
          Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz. Ancak bu durumda web sitemizin bazı bölümleri doğru çalışmayabilir.
        </p>
  
        <p className="text-gray-700">
          Bu politika zaman zaman güncellenebilir. Değişikliklerden haberdar olmak için bu sayfayı düzenli olarak ziyaret ediniz.
        </p>
      </div>
    );
  }
  