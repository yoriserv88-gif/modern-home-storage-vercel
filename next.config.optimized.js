/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 图片优化配置
  images: {
    domains: ['res.cloudinary.com', 'amazon.com', 'm.media-amazon.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 压缩和优化
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // 安全头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  },
  
  // 重写和重定向
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard'
      }
    ]
  },
  
  // 实验性功能
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
}

module.exports = nextConfig