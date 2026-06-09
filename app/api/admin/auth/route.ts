import { NextRequest, NextResponse } from 'next/server'

// 模拟用户数据库
const users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // 实际应用中应该使用哈希密码
    name: 'Administrator',
    role: 'admin'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 验证用户
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 创建响应（实际应用中应该使用JWT）
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

    // 设置cookie（模拟）
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24小时
      path: '/'
    })

    return response

  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // 登出 - 清除cookie
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_auth')
  return response
}