'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import AddToCartModal from './AddToCartModal';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: number) => void;
}

const fallbackImg =
  'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg'; // Yedek resim, istersen değiştir

const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    onAddToCart(id);
    setAdded(true);
    setShowModal(true);
  };

  return (
    <div className="border rounded-2xl shadow p-4 flex flex-col h-full relative hover:shadow-lg transition-shadow">
      {/* Resim */}
      <Link
        href={`/store/${id}`}
        className="block relative h-48 w-full mb-4 overflow-hidden rounded-xl"
      >
        <Image
          src={imageUrl || fallbackImg}
          alt={name}
          fill
          sizes="100vw"
          className="object-contain transition-transform duration-300 hover:scale-105"
          priority
        />
      </Link>

      {/* Başlık */}
      <Link
        href={`/store/${id}`}
        className="text-lg font-semibold mb-2 text-gray-800 hover:text-red-600 transition-colors"
      >
        {name}
      </Link>

      <p className="text-xl font-bold text-green-600 mb-4">
        {price.toFixed(2)} ₺
      </p>

      {/* Sepete Ekle */}
      <button
        onClick={handleClick}
        className={`mt-auto flex items-center justify-center gap-2 rounded-2xl py-2 px-4 transition-colors duration-300 ${
          added
            ? 'bg-red-600 text-white shadow-lg hover:bg-red-700'
            : 'bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white hover:shadow-md'
        }`}
      >
        Sepete Ekle
        {added && <ShoppingCart size={18} />}
      </button>

      {/* Modal */}
      {showModal && (
        <AddToCartModal
          name={name}
          price={price}
          imageUrl={imageUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
