// frontend-app/app/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 19.99;

  const handleCheckout = () => {
    // eğer sepet boş ise checkout sayfasına gitme
    if (cartItems.length === 0) return;
    router.push('/checkout');
  };

  return (
    <main className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛒 Sepetim
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ürün Listesi */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Sepetiniz boş.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price.toFixed(2)} ₺ x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-red-600 font-bold">
                    {(item.price * item.quantity).toFixed(2)} ₺
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Özet */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Özet</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Ara Toplam</span>
            <span>{totalPrice.toFixed(2)} ₺</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Kargo Ücreti</span>
            <span>{shippingCost.toFixed(2)} ₺</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Toplam</span>
            <span>{(totalPrice + shippingCost).toFixed(2)} ₺</span>
          </div>
          <button
            onClick={handleCheckout}
            className={`w-full py-2 rounded-md font-semibold transition ${
              cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            disabled={cartItems.length === 0}
          >
            Satın Al
          </button>
          <Link
            href="/store"
            className="block text-center text-sm text-gray-500 hover:underline"
          >
            🛍 Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </main>
  );
}
