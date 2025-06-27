// frontend-app/components/AdminHeader.tsx
'use client';

import React from 'react';

export default function AdminHeader() {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Yönetim Paneli</h1>
      <div>
        {/* Yönetici adı vs */}
        Sinan YELEK
      </div>
    </header>
  );
}
