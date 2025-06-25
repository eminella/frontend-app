'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-4 max-w-xl mx-auto">
      {/* Küçük görseller */}
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`border rounded-md overflow-hidden ${
              i === selectedIndex ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i}`}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Büyük görsel */}
      <div className="flex-1 border rounded-md overflow-hidden">
        <img
          src={images[selectedIndex]}
          alt={`Product image ${selectedIndex}`}
          className="w-full h-[400px] object-contain"
        />
      </div>
    </div>
  );
}
