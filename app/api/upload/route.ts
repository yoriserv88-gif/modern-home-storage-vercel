import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// 允许的模块目录映射
const MODULE_DIRS = {
  hero: 'banners',
  products: 'products',
  factory: 'factory-img',
  partners: 'partners',
  other: 'other'
}

export async function POST(request: NextRequest) {
  try {
    // 验证管理员权限
    const authCookie = request.headers.get('cookie')?.includes('admin_auth=true')
    if (!authCookie) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const module = formData.get('module') as string
    const alt = formData.get('alt') as string || ''

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File is not an image' },
        { status: 400 }
      )
    }

    // 验证模块
    if (!MODULE_DIRS[module as keyof typeof MODULE_DIRS]) {
      return NextResponse.json(
        { success: false, error: 'Invalid module' },
        { status: 400 }
      )
    }

    // 创建文件名
    const originalName = file.name
    const extension = path.extname(originalName).toLowerCase()
    const safeName = `img_${uuidv4()}${extension}`
    
    // 确定保存路径
    const uploadsDir = path.join(process.cwd(), 'public', 'images', MODULE_DIRS[module as keyof typeof MODULE_DIRS])
    
    // 确保目录存在
    await fs.mkdir(uploadsDir, { recursive: true })
    
    // 保存文件
    const filePath = path.join(uploadsDir, safeName)
    const arrayBuffer = await file.arrayBuffer()
    await fs.writeFile(filePath, Buffer.from(arrayBuffer))

    // 获取文件信息
    const stats = await fs.stat(filePath)
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        id: uuidv4(),
        name: originalName,
        safeName: safeName,
        url: `/images/${MODULE_DIRS[module as keyof typeof MODULE_DIRS]}/${safeName}`,
        module: module,
        size: stats.size,
        alt: alt,
        uploaded: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}
