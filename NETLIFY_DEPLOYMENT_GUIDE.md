# Netlify 部署指南
# 项目: Modern Home Storage Website

## 为什么选择Netlify？
✅ 更好的中国访问性
✅ 免费自动HTTPS/SSL
✅ 简单直观的部署流程
✅ 无TLS版本兼容问题
✅ 支持Next.js 14

## 部署前准备

### 1. 项目检查
确保以下文件存在:
- ✅ `package.json` (Next.js 14.2.13)
- ✅ `next.config.js` (已配置 `images.unoptimized: true`)
- ✅ `netlify.toml` (Netlify配置文件)
- ✅ `app/` 目录 (Next.js App Router)
- ✅ `public/images/` (图片资源)

### 2. 清理项目
建议删除（如果存在）:
- `.next/` 目录
- `node_modules/` 目录
- `vercel.json` 文件

## Netlify部署步骤

### 第1步：注册Netlify账户
1. 访问: https://app.netlify.com/signup
2. 选择注册方式:
   - GitHub账户（推荐）
   - GitLab账户
   - Bitbucket账户
   - 邮箱注册
3. 完成注册验证

### 第2步：创建新站点
1. 登录Netlify: https://app.netlify.com
2. 点击"Add new site" → "Import an existing project"
3. 选择部署方式:

#### 方式A：通过GitHub部署（推荐）
```
1. 连接GitHub账户
2. 选择仓库: modern-home-storage-vercel
3. 点击"Deploy site"
```

#### 方式B：手动拖放部署
```
1. 点击"Deploy manually"
2. 将整个项目文件夹拖放到上传区域
3. 或选择"Browse to upload"
```

#### 方式C：通过CLI部署
```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化部署
netlify init
netlify deploy --prod
```

### 第3步：配置构建设置
Netlify会自动检测为Next.js项目，但请确认:

**构建设置**:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `18` (自动)

**环境变量**（如果需要）:
- 无特殊环境变量需要

### 第4步：等待部署完成
1. 首次部署: 3-5分钟
2. 构建日志: 可在Netlify控制台查看
3. 部署状态: 显示"Published"表示成功

### 第5步：访问网站
部署成功后获得:
```
https://随机名称.netlify.app
```
例如: `https://modern-home-storage.netlify.app`

## 自定义域名配置

### 绑定 `www.hiskiwuu.com` 到Netlify
1. 在Netlify控制台: Site settings → Domain management
2. 点击"Add custom domain"
3. 输入: `www.hiskiwuu.com`
4. 点击"Verify"

### DNS配置
Netlify会显示需要添加的DNS记录:

**CNAME记录**:
```
类型: CNAME
名称: www
值: 随机名称.netlify.app
TTL: 自动
```

**或A记录**（根域名）:
```
类型: A
名称: @
值: 75.2.60.5
```

### SSL证书
1. Netlify自动申请Let's Encrypt证书
2. 等待证书颁发: 5-15分钟
3. 强制HTTPS: 自动启用

## 优化配置

### 1. 性能优化
在 `netlify.toml` 中添加:
```toml
[context.production.environment]
  NEXT_TELEMETRY_DISABLED = "1"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

### 2. 图片优化
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
  [plugins.inputs]
    enableImageOptimization = true
```

### 3. 重定向配置
```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

## 故障排除

### 问题1: 构建失败
**错误**: `Command failed with exit code 1`
**解决**:
1. 检查构建日志
2. 确保Node版本为18
3. 检查 `package.json` 依赖

### 问题2: 图片不显示
**解决**:
1. 确认 `next.config.js` 有 `images.unoptimized: true`
2. 图片路径正确: `/images/...`
3. 检查Netlify构建输出

### 问题3: 路由404
**解决**:
1. 确保使用Next.js App Router
2. 检查 `app/` 目录结构
3. Netlify自动配置Next.js路由

### 问题4: 中国访问慢
**解决**:
1. 启用Netlify全球CDN
2. 配置缓存头
3. 图片使用WebP格式

## 与Vercel对比

### Netlify优势:
- ✅ 中国访问更稳定
- ✅ 配置更简单
- ✅ 免费功能更多
- ✅ 插件生态系统丰富

### Vercel优势:
- ✅ Next.js官方合作
- ✅ 部署速度更快
- ✅ 开发体验更优

## 迁移注意事项

### 从Vercel迁移到Netlify:
1. **删除Vercel配置**:
   - 移除 `vercel.json`
   - 取消Vercel域名绑定

2. **更新DNS**:
   - 将CNAME从Vercel改为Netlify
   - 等待DNS传播

3. **测试验证**:
   - 所有页面功能正常
   - 图片加载正常
   - 表单提交正常

## 监控和维护

### 1. 部署监控
- Netlify控制台查看部署状态
- 设置部署通知（邮件/Slack）

### 2. 性能监控
- Netlify Analytics（免费版有限）
- Google Analytics集成

### 3. 自动部署
连接GitHub后，推送代码自动触发部署

## 技术支持
- Netlify文档: https://docs.netlify.com/
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/
- 社区支持: https://answers.netlify.com/

## 完成标志
✅ 访问: https://随机名称.netlify.app 正常
✅ 自定义域名: https://www.hiskiwuu.com 正常
✅ HTTPS: 绿色锁图标
✅ 所有页面: 正常显示
✅ 图片: 正常加载