# 横幅图片修复说明

## 问题描述
上传了新的 banner 图片，但在前端不显示。

## 原因分析
Hero 组件中的横幅图片路径是硬编码的：
- `home-banner-1.jpg`
- `home-banner-2.jpg`
- `home-banner-3.jpg`

如果你上传的图片名称不同（如 `hero-banner.jpg`），就不会自动替换。

## 解决方案

### 方法 1：修改图片名称（最简单）
将你上传的图片重命名为以下名称之一：
- `home-banner-1.jpg`
- `home-banner-2.jpg`
- `home-banner-3.jpg`

然后刷新页面即可看到新图片。

### 方法 2：修改配置文件
修改 `data/banners.ts` 文件中的 `image` 字段：

```typescript
export const banners = [
  {
    id: 1,
    title: "Modern Kitchen Organization",
    subtitle: "Premium Metal & Wood Storage Solutions for Your Home",
    cta: "Shop Now",
    image: "/images/banners/你的新图片名称.jpg",  // 修改这里
    bgColor: "bg-gray-900"
  },
  // ... 其他横幅
]
```

### 方法 3：自动扫描目录
在 `data/banners.ts` 中使用自动扫描功能（见文件注释）。

## 上传新图片步骤

1. 上传图片到 `/public/images/banners/` 目录
2. 选择上述任一方法让新图片显示
3. 刷新页面（或重启开发服务器）

## 相关文件
- `components/Hero.tsx` - 横幅组件
- `data/banners.ts` - 横幅配置
- `app/page.tsx` - 首页
- `utils/scanBanners.ts` - 自动扫描工具
