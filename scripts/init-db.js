const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库...')

  // 创建默认管理员用户
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin'
    }
  })
  console.log('✅ 创建管理员用户:', adminUser.email)

  // 创建网站模块
  const modules = [
    {
      name: 'Hero Banner',
      description: 'Main banner images for homepage',
      maxImages: 5,
      allowedFormats: 'jpg,png,webp',
      maxSize: 5242880 // 5MB
    },
    {
      name: 'Products',
      description: 'Product showcase images',
      maxImages: 20,
      allowedFormats: 'jpg,png,webp',
      maxSize: 5242880
    },
    {
      name: 'Factory',
      description: 'Factory and manufacturing photos',
      maxImages: 10,
      allowedFormats: 'jpg,png,webp',
      maxSize: 5242880
    },
    {
      name: 'Partners',
      description: 'Partner company logos',
      maxImages: 15,
      allowedFormats: 'png,svg',
      maxSize: 2097152 // 2MB
    },
    {
      name: 'Other',
      description: 'Miscellaneous website images',
      maxImages: 50,
      allowedFormats: 'jpg,png,webp,gif',
      maxSize: 5242880
    }
  ]

  for (const moduleData of modules) {
    const module = await prisma.module.upsert({
      where: { name: moduleData.name },
      update: {},
      create: moduleData
    })
    console.log(`✅ 创建模块: ${module.name}`)
  }

  // 创建默认网站设置
  const settings = [
    { key: 'site_name', value: 'Modern Home Storage', description: '网站名称' },
    { key: 'site_description', value: 'Professional home storage solutions', description: '网站描述' },
    { key: 'contact_email', value: 'contact@example.com', description: '联系邮箱' },
    { key: 'max_upload_size', value: '5242880', description: '最大上传大小（字节）' },
    { key: 'allowed_image_formats', value: 'jpg,png,webp', description: '允许的图片格式' },
    { key: 'maintenance_mode', value: 'false', description: '维护模式' }
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting
    })
    console.log(`✅ 创建设置: ${setting.key}`)
  }

  console.log('🎉 数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error('初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })