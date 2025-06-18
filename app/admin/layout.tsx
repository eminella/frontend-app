export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen font-sans">
        {/* Sol Menü */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-8">Eminella</h2>
          <nav className="space-y-4">
            <a href="/admin" className="hover:bg-gray-800 p-2 rounded block">📦 Ürünler</a>
            <a href="/admin/orders" className="hover:bg-gray-800 p-2 rounded block">🧾 Siparişler</a>
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">Sinan YELEK</p>
          </div>
        </aside>
  
        {/* Sağ İçerik */}
        <main className="flex-1 bg-gray-100 p-10">{children}</main>
      </div>
    );
  }
  