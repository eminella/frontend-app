// frontend-app/src/app/api/products/route.ts
import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND}/api/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Ürünler getirilemedi');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('API proxy GET error:', err);
    return NextResponse.json({ error: 'Ürünler getirilemedi' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // FormData olarak bekliyoruz (image upload için)
    const formData = await request.formData();

    const res = await fetch(`${BACKEND}/api/products`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Ürün eklenemedi');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('API proxy POST error:', err);
    return NextResponse.json({ error: 'Ürün eklenemedi' }, { status: 500 });
  }
}
