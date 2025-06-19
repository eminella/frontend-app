'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function MiniCart() {
  const { cartItems, isMiniCartOpen, toggleMiniCart, removeFromCart } = useCart();

  if (!isMiniCartOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50">
      <div className="bg-white w-full sm:w-[400px] p-6 shadow-lg rounded-t-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sepetim</h2>
          <button onClick={toggleMiniCart} className="text-red-600 hover:underline">
            Kapat
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Sepetiniz boş.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price.toFixed(2)} ₺ x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">
                    {(item.price * item.quantity).toFixed(2)} ₺
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Toplam:</span>
              <span className="text-lg font-bold text-green-600">{total.toFixed(2)} ₺</span>
            </div>

            <Link
              href="/cart"
              onClick={toggleMiniCart}
              className="block bg-red-600 text-white text-center py-2 rounded-lg hover:bg-red-700"
            >
              Sepete Git
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
