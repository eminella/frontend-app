// frontend-app/components/PopularCategories.tsx
'use client';

import { Palette, Shirt, BookOpenText, Gift } from 'lucide-react';

const categories = [
  { name: 'Kitap', icon: <BookOpenText size={32} className="text-red-500" /> },
  { name: 'Oyuncaklar', icon: <Gift size={32} className="text-red-500" /> },
  { name: 'Boyama Setleri', icon: <Palette size={32} className="text-red-500" /> },
  { name: 'Giyim ve Yaşam', icon: <Shirt size={32} className="text-red-500" /> },
];

export default function PopularCategories() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">POPÜLER</h2>
      <h3 className="text-xl text-gray-500 mb-4">KATEGORİLER</h3>
      <p className="text-gray-500 mb-8">
        Popüler yüzlerce Eminella ürünü, bu kategorilerde sizi bekliyor!
      </p>

      <div className="flex items-center justify-center gap-4 mb-10">
        <button className="w-10 h-10 rounded-full border border-gray-300 text-red-500 font-bold hover:bg-gray-100">
          &#8592;
        </button>
        <button className="w-10 h-10 rounded-full border border-gray-300 text-red-500 font-bold hover:bg-gray-100">
          &#8594;
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              {cat.icon}
            </div>
            <p className="text-gray-800 font-semibold">{cat.name}</p>
            <button className="text-sm px-4 py-2 border rounded-full border-gray-300 hover:bg-gray-50 transition">
              Keşfet →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
