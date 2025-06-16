// frontend-app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Yalnızca tam köke gelen isteği yakala
  if (pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/store'
    return NextResponse.redirect(url)
  }

  // Eğer numeric ID geliyorsa (/1, /42)
  if (/^\/\d+$/.test(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = `/store${pathname}`
    return NextResponse.redirect(url)
  }

  // Diğer her isteğe dokunma
  return NextResponse.next()
}

// Yalnızca root ve /:id isteklerini yakala
export const config = {
  matcher: ['/', '/:path(\\d+)'],
}
