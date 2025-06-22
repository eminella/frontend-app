// frontend-app/app/admin/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

type Order = {
  id: number;
  createdAt: string;
  status: string;
  totalAmount: number;
  customerName?: string;
  address?: string;
  phone?: string;
  products: Product[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/api/orders`);
      if (!res.ok) throw new Error('Siparişler alınamadı.');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert('Siparişler alınamadı. Lütfen sayfayı yenileyin.');
      console.error('Siparişler alınamadı:', err);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    if (loadingStatusId !== null) return;

    setLoadingStatusId(id);
    try {
      const res = await fetch(`${API}/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Durum güncellenemedi.');
      await fetchOrders();
    } catch (err) {
      alert('Durum güncellenemedi. Lütfen tekrar deneyin.');
      console.error('Durum güncellenemedi:', err);
    } finally {
      setLoadingStatusId(null);
    }
  };

  const getButtonClass = (orderStatus: string, buttonStatus: string) => {
    if (orderStatus === buttonStatus) {
      switch (buttonStatus) {
        case 'Hazirlanıyor':
          return 'bg-blue-600 text-white';
        case 'Kargoya Verildi':
          return 'bg-green-600 text-white';
        case 'Teslim Edildi':
          return 'bg-gray-700 text-white';
        default:
          return 'bg-gray-400 text-white';
      }
    } else {
      switch (buttonStatus) {
        case 'Hazirlanıyor':
          return 'bg-blue-400 text-white hover:bg-blue-500';
        case 'Kargoya Verildi':
          return 'bg-green-400 text-white hover:bg-green-500';
        case 'Teslim Edildi':
          return 'bg-gray-500 text-white hover:bg-gray-600';
        default:
          return 'bg-gray-300 text-black';
      }
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📦 Sipariş Listesi</h1>

      {orders.length === 0 ? (
        <p className="text-gray-900 font-medium">Henüz sipariş yok.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-gray-900 font-bold text-sm">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Müşteri</th>
              <th className="px-4 py-2 text-left">Telefon</th>
              <th className="px-4 py-2 text-left">Adres</th>
              <th className="px-4 py-2 text-left">Tarih</th>
              <th className="px-4 py-2 text-left">Ürünler</th>
              <th className="px-4 py-2 text-left">Toplam</th>
              <th className="px-4 py-2 text-left">Durum</th>
              <th className="px-4 py-2 text-left">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-900 font-medium">{order.id}</td>
                <td className="px-4 py-2 text-gray-900 font-medium">{order.customerName || '-'}</td>
                <td className="px-4 py-2 text-gray-900 font-medium">{order.phone || '-'}</td>
                <td className="px-4 py-2 text-gray-900 font-medium">{order.address || '-'}</td>
                <td className="px-4 py-2 text-gray-900 font-medium">
                  {new Date(order.createdAt).toLocaleString('tr-TR')}
                </td>
                <td className="px-4 py-2 text-gray-900 font-medium">
                  <ul className="list-none space-y-2">
                    {order.products.map((p) => (
                      <li key={p.id} className="flex items-center gap-2">
                        {p.imageUrl && (
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <span>{p.name} – {p.price.toFixed(2)} TL</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 text-gray-900 font-semibold">
                  {order.totalAmount.toFixed(2)} TL
                </td>
                <td className="px-4 py-2 font-bold text-blue-700">{order.status}</td>
                <td className="px-4 py-2 space-y-1">
                  {['Hazirlanıyor', 'Kargoya Verildi', 'Teslim Edildi'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order.id, status)}
                      disabled={loadingStatusId !== null}
                      className={`block w-full text-xs px-2 py-1 rounded ${getButtonClass(order.status, status)}`}
                    >
                      {status}
                      {loadingStatusId === order.id && order.status !== status && (
                        <span className="ml-1 animate-pulse text-xs">(güncelleniyor)</span>
                      )}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
