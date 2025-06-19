// frontend-app/src/components/MiniCart.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function MiniCart() {
  const { cart, isMiniCartOpen, toggleMiniCart, removeFromCart } = useCart();

  if (!isMiniCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5; // Sabit kargo ücreti örneği
  const total = subtotal + shipping;

  return (
    <>
      {/* Kapatmak için overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleMiniCart}
      />

      {/* Mini-cart panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white z-50 p-6 flex flex-col">
        <button
          onClick={toggleMiniCart}
          className="self-end text-2xl font-bold"
          aria-label="Mini cart kapat"
        >
          ×
        </button>

        <h2 className="text-lg font-medium mb-4">Sepetim</h2>

        <ul className="flex-grow overflow-y-auto space-y-4">
          {cart.map(item => (
            <li key={item.id} className="flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded mr-3" />
              <div className="flex-grow">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm">{item.quantity} × {item.price.toFixed(2)} ₺</p>
              </div>
              <p className="font-semibold">{(item.quantity * item.price).toFixed(2)} ₺</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label="Ürünü kaldır"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t pt-4 space-y-2 text-sm">
          <p>Sepet Toplamı: {subtotal.toFixed(2)} ₺</p>
          <p>Kargo Ücreti: {shipping.toFixed(2)} ₺</p>
          <p className="font-semibold">Genel Toplam: {total.toFixed(2)} ₺</p>
        </div>

        <div className="mt-6 space-y-2">
          <Link href="/cart">
            <button className="w-full bg-red-600 text-white py-2 rounded">
              Sepete Git
            </button>
          </Link>
          <button
            onClick={toggleMiniCart}
            className="w-full border py-2 rounded"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    </>
  );
}
