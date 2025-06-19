// frontend-app/src/app/api/products/route.ts

import { NextResponse } from 'next/server'

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3600'

export async function GET() {
  try {
    // 👇 Buraya /api ekledik
    const res = await fetch(`${BACKEND}/api/products`, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('API proxy error:', err)
    return NextResponse.json(
      { error: 'Ürünler getirilemedi' },
      { status: 500 }
    )
  }
}
