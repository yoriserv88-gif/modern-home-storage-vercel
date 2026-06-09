// 横幅图片配置
// 方法1：手动配置（推荐用于生产环境）
// 上传新图片后，请修改下面的 image 字段为新图片的路径

export const banners = [
  {
    id: 1,
    title: "Modern Kitchen Organization",
    subtitle: "Premium Metal & Wood Storage Solutions for Your Home",
    cta: "Shop Now",
    image: "/images/banners/home-banner-1.jpg",
    bgColor: "bg-gray-900"
  },
  {
    id: 2,
    title: "Custom OEM/ODM Services",
    subtitle: "Tailored Storage Solutions for Your Brand",
    cta: "Get Quote",
    image: "/images/banners/home-banner-2.jpg",
    bgColor: "bg-gray-800"
  },
  {
    id: 3,
    title: "10+ Years Manufacturing Experience",
    subtitle: "Professional Home Storage Products Manufacturer",
    cta: "Learn More",
    image: "/images/banners/home-banner-3.jpg",
    bgColor: "bg-gray-900"
  }
]

// 方法2：自动扫描目录（用于开发测试）
// 如果想使用自动扫描，请取消下面注释
/*
import { scanBanners } from '@/utils/scanBanners'

export const banners = scanBanners()
*/
