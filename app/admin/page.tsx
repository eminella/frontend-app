'use client';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <main className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Yönetim Paneli</h1>
        <p className="text-gray-600">Buradan site yönetimi ile ilgili özet bilgilere ulaşabilirsiniz.</p>
      </div>
    </main>
  );
}