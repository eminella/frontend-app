// frontend-app/app/page.tsx

import { redirect } from 'next/navigation';

export default function RootPage() {
  // Bu satır, sunucu tarafında kök isteğini yakalar
  // ve kullanıcıyı anında '/store' rotasına atlatır
  redirect('/store');
}