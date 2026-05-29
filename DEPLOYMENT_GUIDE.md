# GitHub + Vercel 部署指南

## 项目信息
- 项目名称: modern-home-storage-vercel
- 框架: Next.js 14.2.13
- 构建命令: `npm run build`
- 输出目录: `.next`

## 部署步骤

### 第1步：创建GitHub仓库
1. 访问 https://github.com/new
2. 仓库名称: `modern-home-storage-vercel`
3. **重要**: 不要初始化README、.gitignore或license
4. 点击"Create repository"

### 第2步：使用GitHub Desktop上传
1. 安装GitHub Desktop（如果未安装）: https://desktop.github.com/
2. 打开GitHub Desktop
3. 点击"Add" → "Add Existing Repository"
4. 选择路径: `e:\kiro-amz\modern-home-storage-vercel`
5. 点击"Create a Repository"
6. 设置:
   - Name: `modern-home-storage-vercel`
   - Local Path: `e:\kiro-amz\modern-home-storage-vercel`
   - 取消勾选"Initialize this repository with a README"
7. 点击"Create Repository"
8. 在左侧勾选所有文件
9. 填写提交信息: "Initial commit: Modern home storage website"
10. 点击"Commit to main"
11. 点击"Publish repository"

### 第3步：Vercel部署
1. 访问 https://vercel.com/new
2. 点击"Import Git Repository"
3. 选择: `modern-home-storage-vercel`
4. **关键配置**:
   - **Root Directory**: 留空（不要填写任何内容）
   - Framework Preset: Next.js（自动检测）
   - Build Command: `npm run build`（自动）
   - Output Directory: `.next`（自动）
5. 点击"Deploy"

### 第4步：验证部署
1. 等待构建完成（约2-3分钟）
2. 访问Vercel提供的URL
3. 检查页面:
   - 首页: `/`
   - 产品页: `/products`
   - 关于页: `/about`
   - 联系页: `/contact`
   - 服务页: `/service`

## 故障排除

### 如果构建失败: "No Next.js version detected"
1. 检查Root Directory是否留空
2. 确保package.json在项目根目录
3. 确认Next.js版本为14.2.13

### 如果图片不显示
1. 检查`next.config.js`中的`images.unoptimized: true`
2. 图片路径正确: `/images/...`

### 如果页面404
1. 检查`app/`目录结构
2. 确保有`app/page.tsx`

## 项目结构
```
modern-home-storage-vercel/
├── app/                    # Next.js App Router
├── components/            # React组件
├── data/                  # 数据文件
├── public/                # 静态资源
│   └── images/           # 图片文件
├── .gitignore            # Git忽略文件
├── next.config.js        # Next.js配置
├── package.json          # 项目依赖
├── vercel.json           # Vercel部署配置
└── DEPLOYMENT_GUIDE.md   # 本指南
```

## 技术支持
如果遇到问题:
1. 检查Vercel构建日志
2. 确保GitHub仓库结构正确
3. 验证所有配置文件存在

部署成功后将获得: `https://modern-home-storage-vercel.vercel.app`