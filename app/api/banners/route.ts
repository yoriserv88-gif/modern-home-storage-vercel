import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const bannersFilePath = path.join(process.cwd(), 'data', 'banners.json')

// GET: 获取所有横幅
export async function GET(request: NextRequest) {
  try {
    // 读取JSON文件
    let banners = []
    try {
      const fileContent = await fs.readFile(bannersFilePath, 'utf-8')
      banners = JSON.parse(fileContent)
    } catch (error) {
      // 如果文件不存在，使用默认配置
      const defaultBanners = [
        {
          id: 1,
          title: "Modern Kitchen Organization",
          subtitle: "Premium Metal & Wood Storage Solutions for Your Home",
          cta: "Shop Now",
          image: "/images/banners/home-banner-1.jpg",
          bgColor: "bg-gray-900",
          order: 1
        },
        {
          id: 2,
          title: "Custom OEM/ODM Services",
          subtitle: "Tailored Storage Solutions for Your Brand",
          cta: "Get Quote",
          image: "/images/banners/home-banner-2.jpg",
          bgColor: "bg-gray-800",
          order: 2
        },
        {
          id: 3,
          title: "10+ Years Manufacturing Experience",
          subtitle: "Professional Home Storage Products Manufacturer",
          cta: "Learn More",
          image: "/images/banners/home-banner-3.jpg",
          bgColor: "bg-gray-900",
          order: 3
        }
      ]
      banners = defaultBanners
    }

    // 按order排序
    banners.sort((a: any, b: any) => a.order - b.order)

    return NextResponse.json({ 
      success: true, 
      banners 
    })
  } catch (error) {
    console.error('Error reading banners:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to read banners' },
      { status: 500 }
    )
  }
}

// PUT: 更新横幅
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.id) {
      return NextResponse.json(
        { success: false, error: 'Missing banner ID' },
        { status: 400 }
      )
    }

    // 读取现有横幅
    let banners = []
    try {
      const fileContent = await fs.readFile(bannersFilePath, 'utf-8')
      banners = JSON.parse(fileContent)
    } catch (error) {
      banners = []
    }

    // 更新横幅
    const index = banners.findIndex((b: any) => b.id === data.id)
    if (index > -1) {
      banners[index] = { ...banners[index], ...data }
    } else {
      banners.push(data)
    }

    // 保存回文件
    await fs.writeFile(bannersFilePath, JSON.stringify(banners, null, 2), 'utf-8')

    return NextResponse.json({ 
      success: true, 
      message: 'Banner updated successfully',
      banners
    })
  } catch (error) {
    console.error('Error updating banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update banner' },
      { status: 500 }
    )
  }
}

// DELETE: 删除横幅
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing banner ID' },
        { status: 400 }
      )
    }

    // 读取现有横幅
    let banners = []
    try {
      const fileContent = await fs.readFile(bannersFilePath, 'utf-8')
      banners = JSON.parse(fileContent)
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Banners file not found' },
        { status: 404 }
      )
    }

    // 删除横幅
    banners = banners.filter((b: any) => b.id !== id)

    // 保存回文件
    await fs.writeFile(bannersFilePath, JSON.stringify(banners, null, 2), 'utf-8')

    return NextResponse.json({ 
      success: true, 
      message: 'Banner deleted successfully',
      banners
    })
  } catch (error) {
    console.error('Error deleting banner:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete banner' },
      { status: 500 }
    )
  }
}
