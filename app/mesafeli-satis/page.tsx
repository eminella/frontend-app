// frontend-app/src/app/mesafeli-satis/page.tsx
'use client';

export default function MesafeliSatisPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Mesafeli Satış Sözleşmesi</h1>

      <p className="mb-4">
        İşbu Mesafeli Satış Sözleşmesi, aşağıda belirtilen şartlar dahilinde alıcı ve satıcı arasında düzenlenmiştir.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">1. Taraflar</h2>
      <p className="mb-4">
        <strong>Satıcı:</strong> Eminella Takı ve Aksesuar<br />
        <strong>Alıcı:</strong> Kullanıcı tarafından sipariş sırasında beyan edilen bilgiler.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">2. Konu</h2>
      <p className="mb-4">
        Bu sözleşmenin konusu, alıcının satıcıya ait web sitesi üzerinden elektronik ortamda sipariş verdiği aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili yönetmelikler hükümleri gereğince tarafların hak ve yükümlülüklerini kapsamaktadır.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">3. Ürün ve Teslimat Bilgileri</h2>
      <p className="mb-4">
        Siparişe ait ürünler, alıcının belirttiği teslimat adresine gönderilecektir. Kargo masrafları ve teslim süresi sipariş sırasında belirtilir.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">4. Cayma Hakkı</h2>
      <p className="mb-4">
        Alıcı, ürünü teslim aldığı tarihten itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">5. İade Koşulları</h2>
      <p className="mb-4">
        Cayma hakkının kullanılması için ürünün kullanılmamış olması ve ambalajının zarar görmemiş olması gerekmektedir. İade kargo bedeli aksi belirtilmedikçe alıcıya aittir.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-2">6. Yürürlük</h2>
      <p>
        Bu sözleşme, elektronik ortamda alıcı tarafından okunarak kabul edilmiş ve onaylanmıştır. Siparişin tamamlanması ile birlikte sözleşme yürürlüğe girer.
      </p>
    </main>
  );
}
