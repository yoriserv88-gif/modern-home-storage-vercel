# 后台管理功能 - 最终安装和使用指南

## 🚀 快速开始

### 第1步：安装依赖
由于Windows PowerShell限制，请使用以下方法：

**方法A：使用命令提示符（CMD）**
1. 打开命令提示符（不是PowerShell）
2. 执行：
```cmd
cd e:\kiro-amz\modern-home-storage-vercel
npm install next-auth @prisma/client prisma cloudinary bcryptjs @types/bcryptjs uuid @types/uuid
```

**方法B：修改PowerShell执行策略（临时）**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
cd e:\kiro-amz\modern-home-storage-vercel
npm install next-auth @prisma/client prisma cloudinary bcryptjs @types/bcryptjs uuid @types/uuid
```

### 第2步：配置Cloudinary（可选）
1. 注册：https://cloudinary.com/
2. 获取API密钥
3. 更新 `.env.local` 文件：
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**如果不配置Cloudinary**：系统会使用本地文件上传（功能有限）

### 第3步：初始化数据库
```bash
npx prisma db push
node scripts/init-db.js
```

### 第4步：启动开发服务器
```bash
npm run dev
```

## 🔐 访问后台

### 登录信息：
- **URL**: http://localhost:3000/admin/login
- **邮箱**: `admin@example.com`
- **密码**: `admin123`

### 主要功能页面：
1. **仪表板** (`/admin/dashboard`) - 数据概览
2. **图片上传** (`/admin/images/upload`) - 上传新图片
3. **图片管理** (`/admin/images/manage`) - 管理现有图片
4. **消息管理** (`/admin/messages`) - 查看联系表单消息

## 📁 功能详解

### 1. 图片上传功能
- **拖放上传**：支持拖放文件到上传区域
- **模块分类**：
  - Hero Banner（首页横幅）
  - Products（产品图片）
  - Factory（工厂图片）
  - Partners（合作伙伴logo）
  - Other（其他图片）
- **文件验证**：最大5MB，支持JPG/PNG/WebP
- **批量上传**：一次可上传多个文件

### 2. 图片管理功能
- **搜索筛选**：按名称、描述搜索
- **模块筛选**：按模块分类查看
- **批量操作**：选择多个图片进行删除
- **图片信息**：查看尺寸、大小、上传时间
- **预览编辑**：查看和编辑图片信息

### 3. 用户认证
- **简单登录**：用户名密码验证
- **路由保护**：未登录无法访问后台
- **会话管理**：保持登录状态

### 4. 仪表板
- **数据统计**：图片数量、消息数量等
- **快速操作**：常用功能快捷入口
- **最近活动**：显示最近操作记录
- **存储统计**：显示存储使用情况

## ⚙️ 技术架构

### 前端：
- Next.js 14 App Router
- React + TypeScript
- Tailwind CSS
- Lucide React图标

### 后端：
- **数据库**：Prisma + SQLite（开发）/ PostgreSQL（生产）
- **图片存储**：Cloudinary（推荐）或本地文件系统
- **认证**：简单的会话管理
- **API路由**：RESTful API设计

### 安全：
- 路由保护中间件
- 文件类型和大小验证
- 输入验证和清理

## 🚨 生产环境部署

### 需要修改：
1. **数据库**：将SQLite改为PostgreSQL或MySQL
2. **图片存储**：配置Cloudinary或AWS S3
3. **认证**：使用NextAuth.js配置OAuth
4. **环境变量**：设置生产环境变量
5. **安全**：启用HTTPS，配置CORS

### 生产环境 `.env.production`：
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_SECRET="strong-secret-key-here"
NEXTAUTH_URL="https://yourdomain.com"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 🔧 故障排除

### 常见问题：

1. **无法安装依赖**
   ```bash
   # 使用CMD而不是PowerShell
   # 或临时修改执行策略
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```

2. **数据库初始化失败**
   ```bash
   # 删除现有数据库文件
   rm prisma/dev.db
   # 重新初始化
   npx prisma db push
   node scripts/init-db.js
   ```

3. **图片上传失败**
   - 检查 `public/uploads` 目录权限
   - 验证文件大小和类型
   - 检查Cloudinary配置

4. **登录失败**
   - 检查数据库用户是否存在
   - 验证环境变量
   - 清除浏览器缓存

### 调试方法：
1. 查看浏览器控制台错误
2. 检查服务器终端输出
3. 验证API端点：http://localhost:3000/api/admin/images/upload
4. 检查数据库：`npx prisma studio`

## 📈 扩展功能建议

### 短期可添加：
1. **用户管理**：添加/编辑/删除管理员
2. **图片裁剪**：在线图片编辑工具
3. **批量替换**：批量更新图片
4. **图片水印**：自动添加水印

### 长期可添加：
1. **内容管理**：编辑页面文字内容
2. **SEO管理**：管理元标签和SEO设置
3. **分析集成**：Google Analytics集成
4. **备份系统**：自动数据备份
5. **多语言支持**：国际化功能

## 📞 技术支持

### 文档链接：
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Cloudinary: https://cloudinary.com/documentation
- Tailwind CSS: https://tailwindcss.com/docs

### 问题反馈：
1. 记录错误信息
2. 截图问题页面
3. 描述操作步骤
4. 提供环境信息

## ✅ 完成检查清单

- [ ] 成功安装所有依赖
- [ ] 数据库初始化完成
- [ ] 开发服务器正常启动
- [ ] 可以访问登录页面
- [ ] 使用演示凭证登录成功
- [ ] 图片上传功能正常
- [ ] 图片管理功能正常
- [ ] 路由保护正常工作

## 🎯 立即测试

1. **启动服务器**：`npm run dev`
2. **访问登录**：http://localhost:3000/admin/login
3. **登录测试**：使用 `admin@example.com` / `admin123`
4. **上传测试**：尝试上传一张图片
5. **管理测试**：查看和管理上传的图片

**现在可以开始使用了！**