// frontend-app/components/ProductSlider.tsx
'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const campaignProducts = [
  {
    id: 1,
    name: 'Akıllı Tavşan Momo - Kalemlik',
    imageUrl: '/campaign/momo.png',
    oldPrice: 189.9,
    price: 161.42,
    discountText: '%15 İNDİRİM',
  },
  {
    id: 2,
    name: 'TRT Logolu Metal Anahtarlık',
    imageUrl: '/campaign/anahtarlik.png',
    oldPrice: 137.9,
    price: 117.22,
    discountText: '%15 İNDİRİM',
  },
  {
    id: 3,
    name: 'Sürpriz Kutusu Mini Tasarım',
    imageUrl: '/campaign/surpriz.png',
    oldPrice: 266.9,
    price: 226.87,
    discountText: '%15 İNDİRİM',
  },
  {
    id: 4,
    name: 'Z Takımı - Hazine Avı Kutu Oyunu',
    imageUrl: '/campaign/hazine.png',
    oldPrice: 435.9,
    price: 370.52,
    discountText: '%15 İNDİRİM',
  },
];

export default function ProductSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'free-snap',
    slides: { perView: 2.2, spacing: 16 },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 3, spacing: 24 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 4, spacing: 32 },
      },
    },
  });

  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kampanyalı Ürünler</h2>
      <div ref={sliderRef} className="keen-slider px-4">
        {campaignProducts.map((product) => (
          <div
            key={product.id}
            className="keen-slider__slide bg-white border rounded-2xl p-4 shadow-sm flex flex-col items-center relative"
          >
            {/* İndirim Rozeti */}
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
              {product.discountText}
            </div>

            {/* Ürün Görseli */}
            <div className="w-full h-40 relative mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Ürün Adı */}
            <p className="text-center text-sm font-medium text-gray-800 mb-2 min-h-[40px]">
              {product.name}
            </p>

            {/* Fiyat */}
            <div className="text-center mb-4">
              <span className="text-sm text-gray-400 line-through mr-2">
                {product.oldPrice.toFixed(2)} TL
              </span>
              <span className="text-lg font-bold text-red-600">
                {product.price.toFixed(2)} TL
              </span>
            </div>

            {/* Buton */}
            <button className="flex items-center justify-center gap-1 text-sm px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition">
              Sepete Ekle <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
