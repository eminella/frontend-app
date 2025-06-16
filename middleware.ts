// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Eğer istek tam köke geliyorsa
  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/store'
    return NextResponse.redirect(url)
  }

  // Eğer istek kökün altındaki numeric ID ise (/1, /42 vs)
  if (/^\/\d+$/.test(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = `/store${pathname}`
    return NextResponse.redirect(url)
  }

  // Diğer tüm istekler normal devam etsin
  return NextResponse.next()
}

// Yalnızca root ve '/:id' isteklerine eşle
export const config = {
  matcher: ['/', '/:path*'],
}
