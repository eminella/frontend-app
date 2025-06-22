// frontend-app/src/app/iade-basvurusu/page.tsx

export default function IadeBasvurusuPage() {
    return (
      <main className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6 mb-12">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">İptal / İade Başvurusu</h1>
        <p className="mb-6 text-gray-700">
          Eminella olarak müşteri memnuniyetine önem veriyoruz. Satın aldığınız ürünleri 14 gün içerisinde iade edebilirsiniz.
        </p>
  
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sipariş Numarası *</label>
            <input
              type="text"
              required
              placeholder="#123456"
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">E-Posta Adresiniz *</label>
            <input
              type="email"
              required
              placeholder="example@mail.com"
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">İade Nedeni *</label>
            <textarea
              required
              rows={4}
              placeholder="İade nedeninizi yazınız"
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
  
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
          >
            Başvuruyu Gönder
          </button>
        </form>
      </main>
    );
  }
  