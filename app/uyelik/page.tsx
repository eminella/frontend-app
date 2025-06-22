// frontend-app/src/app/uyelik/page.tsx

export default function UyelikPage() {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Üyelik Bilgileri</h1>
        <p className="mb-4">
          Eminella mağazasına üye olarak, siparişlerinizi kolayca takip edebilir, geçmiş siparişlerinizi görüntüleyebilir ve kampanyalardan ilk siz haberdar olabilirsiniz.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Üyelik tamamen ücretsizdir.</li>
          <li>Üyelik bilgileriniz gizli tutulur ve üçüncü şahıslarla paylaşılmaz.</li>
          <li>Üye olduktan sonra adres bilgilerinizi kaydedebilir, sipariş takibini kolayca yapabilirsiniz.</li>
          <li>Hediye çekleri, kampanyalar ve özel indirimler için ilk siz bilgilendirilirsiniz.</li>
        </ul>
      </div>
    );
  }