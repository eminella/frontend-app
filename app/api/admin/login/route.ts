import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const correctEmail = process.env.ADMIN_EMAIL;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (email === correctEmail && password === correctPassword) {
    cookies().set('admin-auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 12,
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Giriş başarısız' }, { status: 401 });
}
