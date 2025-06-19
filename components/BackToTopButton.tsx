// frontend-app/src/components/BackToTopButton.tsx
'use client';

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 p-3 bg-red-600 text-white rounded-full shadow-lg"
      aria-label="Sayfanın başına dön"
    >
      ↑
    </button>
  );
}
