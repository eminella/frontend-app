'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: number;
  createdAt: string;
  status: string;
  totalAmount: number;
  items: { id: number; name: string; price: number; quantity: number }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const API_URL = 'http://localhost:3500/orders';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    await fetch(`${API_URL}/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders();
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sipariş Yönetimi</h1>
      {orders.length === 0 && <p>Henüz sipariş yok.</p>}

      {orders.map(order => (
        <div
          key={order.id}
          className="border rounded-md p-4 mb-4 shadow-sm bg-white"
        >
          <div className="flex justify-between mb-2">
            <div>
              <strong>ID:</strong> {order.id}
              <br />
              <strong>Tarih:</strong> {new Date(order.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Durum:</strong>{' '}
              <select
                value={order.status}
                onChange={e => updateStatus(order.id, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option>Hazırlanıyor</option>
                <option>Kargoya Verildi</option>
                <option>Teslim Edildi</option>
                <option>İptal Edildi</option>
              </select>
            </div>
          </div>

          <div>
            <strong>Toplam Tutar:</strong> {order.totalAmount.toFixed(2)} ₺
          </div>

          <div className="mt-2">
            <strong>Ürünler:</strong>
            <ul className="list-disc ml-5">
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} - {item.price} ₺ x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </main>
  );
}
