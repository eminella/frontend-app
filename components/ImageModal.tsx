'use client';

import { useEffect } from 'react';

interface Props {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<Props> = ({ imageUrl, onClose }) => {
  // ESC ile kapat
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()} // modal içi tıklama kapatmasın
      >
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 text-3xl text-white"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Büyük Görsel"
          className="w-full h-auto rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default ImageModal;
