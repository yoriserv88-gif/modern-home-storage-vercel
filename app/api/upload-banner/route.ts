import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

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
    const bannerId = formData.get('bannerId') as string
    const image = formData.get('image') as string

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

    // 创建文件名（保留原文件扩展名）
    const originalName = file.name
    const extension = path.extname(originalName).toLowerCase()
    const safeName = `banner_${bannerId}${extension}`

    // 确定保存路径
    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'banners')

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
      message: 'Banner uploaded successfully',
      data: {
        id: bannerId,
        name: originalName,
        safeName: safeName,
        url: `/images/banners/${safeName}`,
        size: stats.size,
        uploaded: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error uploading banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload banner' },
      { status: 500 }
    )
  }
}
