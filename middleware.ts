import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Define authentication pages
  const isAuthPage = pathname === '/arc/login' || pathname === '/arc/register'
  
  // Extract the token from cookies
  const token = request.cookies.get('admin_token')?.value

  let isAuthenticated = false
  if (token) {
    try {
      // Verify the JWT 
      await jwtVerify(token, SECRET_KEY)
      isAuthenticated = true
    } catch (err) {
      isAuthenticated = false
    }
  }

  // If the user is NOT authenticated and trying to access a protected route
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/arc/login', request.url))
  }

  // If the user IS authenticated and trying to access the login/register page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/arc', request.url))
  }

  return NextResponse.next()
}

// Only run middleware on /arc routes
export const config = {
  matcher: ['/arc/:path*'],
}