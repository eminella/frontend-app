'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import classNames from 'classnames';

import ImageModal from '@/components/ImageModal';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrls: string[];
  description?: string;  // description alanı eklendi
};

const tabs = [
  'Ürün Açıklaması',
  'Ödeme Seçenekleri',
  'Tavsiye Et',
  'İade Koşulları',
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { addToCart } = useCart();
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  // Modal için state'ler
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${params.id}`);
        if (!res.ok) return notFound();
        const data = await res.json();
        setProduct(data);
        setMainImage(data.imageUrls[0]); // Ana resmi ilk olarak ata
      } catch (err) {
        console.error('❌ Ürün getirilemedi:', err);
        notFound();
      }
    };
    fetchProduct();
  }, [params.id, BASE_URL]);

  if (!product)
    return <div className="p-10 text-center text-gray-500">Ürün yükleniyor...</div>;

  // Modal açma fonksiyonu
  const openModal = (src: string) => {
    setModalSrc(src);
    setModalOpen(true);
  };

  // Modal kapama fonksiyonu
  const closeModal = () => {
    setModalOpen(false);
    setModalSrc('');
  };

  return (
    <div className="bg-white min-h-screen">
      <main className="p-4 md:p-10 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Ana büyük resim */}
          <div className="flex-1">
            <img
              src={mainImage}
              alt={product.name}
              className="cursor-pointer rounded border"
              onClick={() => openModal(mainImage)} // Modal açma
            />

            {/* Küçük resimler */}
            <div className="flex gap-2 mt-4">
              {product.imageUrls.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="w-16 h-16 cursor-pointer object-cover rounded border"
                  onClick={() => setMainImage(img)} // Ana resmi değiştir
                />
              ))}
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">{product.name}</h1>

            <p className="text-sm text-gray-500 mb-2">
              Ürün Kodu: EM{product.id.toString().padStart(6, '0')}
            </p>

            <div className="mb-4">
              <span className="text-gray-400 line-through mr-2">
                {(product.price * 1.4).toFixed(2)} ₺
              </span>
              <span className="text-2xl text-red-600 font-bold">
                {product.price.toFixed(2)} ₺
              </span>
            </div>

            {/* Miktar + Sepete Ekle */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 text-lg rounded-full border border-gray-400 text-gray-800"
              >
                –
              </button>

              <span className="w-10 text-center text-gray-800 font-medium text-lg">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 text-lg rounded-full border border-gray-400 text-gray-800"
              >
                +
              </button>

              <button
                onClick={() => {
                  addToCart(product, quantity);
                  router.push('/cart');
                }}
                className="ml-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
              >
                SEPETE EKLE
              </button>
            </div>
          </div>
        </div>

        {/* Sekmeli Açıklamalar */}
        <div className="mt-10 border-t pt-6">
          <div className="flex gap-6 border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={classNames(
                  'pb-2 text-sm font-medium transition-colors',
                  activeTab === tab
                    ? 'border-b-2 border-red-600 text-red-600'
                    : 'text-gray-500 hover:text-red-600'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-gray-700 text-sm leading-relaxed">
            {activeTab === 'Ürün Açıklaması' && (
              <p>
                {product.description ||
                  `${product.name} ürünü yüksek kalite malzemelerle üretilmiştir. Suya ve kimyasala temas etmemelidir.`}
              </p>
            )}
            {activeTab === 'Ödeme Seçenekleri' && (
              <p>Kredi kartı, havale ve kapıda ödeme seçenekleri mevcuttur.</p>
            )}
            {activeTab === 'Tavsiye Et' && (
              <p>Bu ürünü beğendiysen, sosyal medya üzerinden arkadaşlarına öner!</p>
            )}
            {activeTab === 'İade Koşulları' && (
              <p>Ürünü 7 gün içinde iade edebilirsin. Koşulsuz iade garantisi.</p>
            )}
          </div>
        </div>
      </main>

      {/* Modal varsa göster */}
      {modalOpen && <ImageModal imageUrl={modalSrc} onClose={closeModal} />}
    </div>
  );
}
