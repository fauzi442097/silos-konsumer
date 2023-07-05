import { NextRequest, NextResponse } from "next/server"

export function middleware(request) {

   const isAuthenticated = request.cookies.has('auth')
   const route = request.nextUrl.pathname
   // if ( route != '/login' && !isAuthenticated ) return NextResponse.redirect(new URL('/login', request.url))
   // if ( route == '/login' && isAuthenticated ) return NextResponse.redirect(new URL('/', request.url))
   return NextResponse.next()
}

export const config = {
   matcher: '/((?!api|_next/static|_next/image|favicon.ico|img|css|font).*)'
 }

