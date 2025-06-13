'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: number;
  items: string;
  totalAmount: number;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">📦 Siparişler</h1>
      {orders.length === 0 ? (
        <p>Henüz sipariş yok.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="p-4 bg-white shadow rounded">
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>Tutar:</strong> {order.totalAmount} ₺</p>
              <p><strong>Tarih:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Ürünler:</strong></p>
              <ul className="pl-4 list-disc">
                {JSON.parse(order.items).map((item: any, i: number) => (
                  <li key={i}>
                    {item.name} — {item.quantity} x {item.price} ₺
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
