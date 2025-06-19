'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Props {
  name: string;
  price: number;
  imageUrl?: string;
  onClose: () => void;
}

const AddToCartModal = ({ name, price, imageUrl, onClose }: Props) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Ürün Sepete Eklendi!</h2>

        <div className="flex flex-col items-center mb-6">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              width={100}
              height={100}
              className="rounded mb-3"
            />
          )}
          <p className="font-semibold text-gray-700">{name}</p>
          <p className="text-green-600 font-bold">{price.toFixed(2)} ₺</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 rounded-xl py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            Alışverişe Devam Et
          </button>
          <button
            onClick={() => router.push('/cart')}
            className="flex-1 bg-red-600 text-white rounded-xl py-2 hover:bg-red-700 text-sm"
          >
            Sepete Git
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
