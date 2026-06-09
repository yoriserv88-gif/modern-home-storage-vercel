import fs from 'fs'
import path from 'path'

/**
 * 扫描 banners 目录并返回图片列表
 * 用于自动生成横幅配置
 */
export function scanBanners() {
  const bannersDir = path.join(process.cwd(), 'public', 'images', 'banners')
  
  try {
    const files = fs.readdirSync(bannersDir)
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|webp)$/i)
    )
    
    return imageFiles.map((file, index) => ({
      id: index + 1,
      title: file.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      subtitle: 'Premium Storage Solution',
      cta: 'Learn More',
      image: `/images/banners/${file}`,
      bgColor: index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
    }))
  } catch (error) {
    console.error('Error scanning banners directory:', error)
    return []
  }
}
