'use client';

export default function LogoutButton() {
  const handle = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };
  return (
    <button onClick={handle}
      className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
      🚪 Çıkış Yap
    </button>
  );
}
