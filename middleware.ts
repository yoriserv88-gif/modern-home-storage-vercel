import { NextRequest, NextResponse } from 'next/server'

// 需要认证的路由
const protectedRoutes = [
  '/admin/dashboard',
  '/admin/images',
  '/admin/messages',
  '/admin/settings'
]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some(route => 
    path.startsWith(route) && path !== '/admin/login'
  )

  if (isProtectedRoute) {
    // 检查登录状态（这里使用简单的cookie检查）
    // 实际应用中应该使用更安全的认证方式
    const isLoggedIn = request.cookies.get('admin_auth')?.value === 'true'
    
    if (!isLoggedIn) {
      // 重定向到登录页面
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}