import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // 🔒 Cookie'yi temizle
  cookies().set('admin-auth', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
