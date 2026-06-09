# 后台管理功能安装指南

## 功能概述
✅ 用户登录/登出系统
✅ 图片上传功能（按模块分类）
✅ 图片管理界面
✅ 仪表板统计
✅ 路由保护中间件

## 已创建的文件

### 页面文件:
1. `/app/admin/login/page.tsx` - 登录页面
2. `/app/admin/dashboard/page.tsx` - 仪表板
3. `/app/admin/images/upload/page.tsx` - 图片上传
4. `/app/admin/images/manage/page.tsx` - 图片管理
5. `/app/admin/messages/page.tsx` - 消息管理（已存在）

### API路由:
1. `/app/api/admin/auth/route.ts` - 认证API

### 配置文件:
1. `/middleware.ts` - 路由保护中间件

## 安装步骤

### 第1步：安装依赖
由于npm执行策略限制，请手动安装：

```bash
cd e:\kiro-amz\modern-home-storage-vercel
npm install next-auth @prisma/client prisma cloudinary bcryptjs @types/bcryptjs
```

### 第2步：配置环境变量
创建 `.env.local` 文件：

```env
# 数据库配置（使用SQLite）
DATABASE_URL="file:./dev.db"

# NextAuth配置
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary配置（图片存储）
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 第3步：初始化数据库
```bash
npx prisma init
npx prisma db push
```

### 第4步：运行开发服务器
```bash
npm run dev
```

## 访问后台

### 登录信息:
- **URL**: http://localhost:3000/admin/login
- **邮箱**: admin@example.com
- **密码**: admin123

### 功能页面:
1. **仪表板**: `/admin/dashboard`
2. **图片上传**: `/admin/images/upload`
3. **图片管理**: `/admin/images/manage`
4. **消息管理**: `/admin/messages`

## 功能说明

### 1. 图片上传
- 支持拖放上传
- 按模块分类：Hero Banner、Products、Factory、Partners
- 图片预览和批量上传
- 文件大小和格式验证

### 2. 图片管理
- 搜索和筛选功能
- 批量操作（删除、下载）
- 按模块统计
- 图片信息编辑

### 3. 用户认证
- 简单的登录/登出
- 路由保护中间件
- 会话管理

### 4. 仪表板
- 数据统计卡片
- 最近活动记录
- 快速操作入口
- 存储使用情况

## 生产环境部署

### 需要配置:
1. **数据库**: 使用PostgreSQL或MySQL
2. **图片存储**: 配置Cloudinary账户
3. **认证**: 使用NextAuth.js配置OAuth提供商
4. **环境变量**: 设置生产环境变量

### 安全建议:
1. 修改默认登录凭证
2. 启用HTTPS
3. 配置CORS策略
4. 定期备份数据库

## 扩展功能建议

### 短期可添加:
1. **用户管理**: 添加/删除管理员
2. **图片裁剪**: 在线图片编辑
3. **批量操作**: 批量替换图片
4. **版本控制**: 图片历史版本

### 长期可添加:
1. **内容管理**: 编辑页面文字内容
2. **SEO管理**: 元标签和SEO设置
3. **分析集成**: Google Analytics
4. **备份恢复**: 数据备份功能

## 故障排除

### 常见问题:
1. **登录失败**: 检查环境变量和数据库连接
2. **图片上传失败**: 检查Cloudinary配置
3. **路由保护失效**: 检查中间件配置
4. **样式问题**: 检查Tailwind CSS配置

### 调试方法:
1. 检查浏览器控制台错误
2. 查看服务器日志
3. 验证环境变量
4. 测试API端点

## 技术支持
- Next.js文档: https://nextjs.org/docs
- NextAuth.js文档: https://next-auth.js.org
- Prisma文档: https://www.prisma.io/docs
- Cloudinary文档: https://cloudinary.com/documentation

## 注意事项
1. 当前为演示版本，使用本地存储
2. 生产环境需要配置真实数据库
3. 建议使用专业图片存储服务
4. 定期更新依赖包确保安全