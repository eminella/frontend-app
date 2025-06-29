// frontend-app/components/BannerSlider.tsx
'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const banners = [
  {
    image: '/banner1.png',
    title: 'Karne Hediyeleriniz',
    subtitle: 'TRT Market’te',
    discount: '%15 İNDİRİM!',
  },
  {
    image: '/banner2.png',
    title: 'Yaz Koleksiyonu',
    subtitle: 'Eminella’da',
    discount: '%20 İNDİRİM!',
  },
];

export default function BannerSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow mb-8">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="keen-slider__slide flex flex-col md:flex-row items-center justify-between bg-white p-6 md:p-12"
        >
          <div className="max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{banner.title}</h2>
            <h3 className="text-2xl text-red-600 font-bold mb-4">{banner.subtitle}</h3>
            <p className="bg-red-600 text-white inline-block px-4 py-2 rounded font-semibold">
              {banner.discount}
            </p>
          </div>
          <img src={banner.image} alt={banner.title} className="w-60 md:w-96 object-contain" />
        </div>
      ))}
    </div>
  );
}
