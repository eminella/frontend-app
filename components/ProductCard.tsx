'use client';

import React, { useState } from 'react';
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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="border rounded-2xl shadow p-4 flex flex-col h-full relative">
      <div className="relative h-48 w-full mb-4">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-contain" />
        ) : (
          <div className="bg-gray-100 h-full flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-xl font-bold text-green-600 mb-4">{price.toFixed(2)} ₺</p>

      <button
        onClick={handleClick}
        className={`mt-auto flex items-center justify-center gap-2 rounded-2xl py-2 px-4 transition-all
          ${added
            ? 'bg-red-600 text-white shadow-lg'
            : 'bg-white text-red-600 border border-red-600 hover:bg-red-50'}`}
      >
        Sepete Ekle
        {added && <ShoppingCart size={18} />}
      </button>

      {showModal && (
        <AddToCartModal
          name={name}
          price={price}
          imageUrl={imageUrl}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ProductCard;
