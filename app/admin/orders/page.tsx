'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
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
        case 'Hazırlanıyor':
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
        case 'Hazırlanıyor':
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
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Siparişler</h1>


      {orders.length === 0 && <p className="text-black font-medium">Henüz sipariş yok.</p>}

      <ul className="space-y-6">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded shadow">
            <div className="flex flex-col md:flex-row justify-between mb-2 gap-4">
              <div>
                <p className="text-black font-medium"><strong>ID:</strong> {order.id}</p>
                <p className="text-black font-medium"><strong>Tarih:</strong> {new Date(order.createdAt).toLocaleString('tr-TR')}</p>
                <p className="text-black font-medium"><strong>Müşteri:</strong> {order.customerName || '-'}</p>
                <p className="text-black font-medium"><strong>Adres:</strong> {order.address || '-'}</p>
                <p className="text-black font-medium"><strong>Telefon:</strong> {order.phone || '-'}</p>
                <p className="text-black font-medium"><strong>Toplam:</strong> {order.totalAmount.toFixed(2)} TL</p>
                <p className="text-black font-medium"><strong>Durum:</strong> {order.status}</p>
              </div>

              <div className="flex flex-col gap-2">
                {['Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'].map((status) => (
                  <button
                    key={status}
                    disabled={loadingStatusId !== null}
                    onClick={() => updateStatus(order.id, status)}
                    className={`px-3 py-1 rounded font-semibold ${getButtonClass(order.status, status)}`}
                  >
                    {status}
                    {loadingStatusId === order.id && order.status !== status && (
                      <span className="ml-2 animate-pulse">(Güncelleniyor)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-black font-medium"><strong>Ürünler:</strong></p>
              <ul className="list-disc list-inside">
                {order.products.map((p) => (
                  <li key={p.id} className="text-black font-medium">
                    {p.name} - {p.price.toFixed(2)} TL
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
