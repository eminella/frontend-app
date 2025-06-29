'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Banner {
  id: number;
  title?: string;
  imageUrl: string;
}

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

  useEffect(() => {
    fetch(`${BASE_URL}/api/banners`)
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);

  if (banners.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl mb-10">
      <div className="flex gap-4 overflow-x-auto hide-scrollbar">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full relative h-[220px] bg-white flex items-center justify-between px-10"
          >
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-4xl font-bold text-black">{banner.title || 'Eminella Fırsatları'}</h2>
              <p className="text-red-600 font-bold text-lg">TRT Market’te</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded">%15 İNDİRİM!</button>
            </div>
            <Image
              src={banner.imageUrl}
              alt={banner.title || 'Banner'}
              width={400}
              height={200}
              className="h-[180px] w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
