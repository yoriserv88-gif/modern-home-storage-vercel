# Vercel 部署检查清单

## 推送到 GitHub 后，Vercel 会自动部署

### 1. 等待自动部署
- 推送到 GitHub 后，等待 1-2 分钟
- Vercel 会自动检测到新的 commit
- 访问 https://vercel.com/dashboard 查看部署进度

### 2. 检查部署状态

在 Vercel Dashboard 中：
1. 找到你的项目
2. 查看 **Deployments** 标签页
3. 应该看到最新的一次部署，状态为 **Building** → **Ready**

### 3. 查看部署日志

如果部署失败或需要检查：
1. 点击最新的部署
2. 查看 **Build Logs** 和 **Function Logs**
3. 检查是否有错误信息

### 4. 访问预览地址

部署成功后，Vercel 会提供一个预览 URL：
```
https://your-project.vercel.app
```

访问这个 URL 查看你的网站。

---

## 如果需要手动重新部署

### 方法 1：通过 Vercel Dashboard
1. 访问 https://vercel.com/dashboard
2. 找到你的项目
3. 点击进入项目详情
4. 点击 **Deployments** 标签
5. 找到最新部署，点击 **Redeploy**

### 方法 2：通过 Git Push
如果你已经推送了代码，可以强制触发：
```bash
# 推送一个空 commit 来触发重新部署
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

---

## 环境变量检查

### 本地环境变量（开发用）
确保你有 `.env.local` 文件：
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
APP_URL="http://localhost:3000"
```

### Vercel 环境变量（生产用）
在 Vercel Dashboard 中设置：

1. 访问 https://vercel.com/dashboard
2. 找到你的项目
3. 点击 **Settings** → **Environment Variables**

需要设置的变量：
| Variable | Value | Production |
|----------|-------|------------|
| `DATABASE_URL` | 你的数据库 URL | ✅ |
| `NEXTAUTH_SECRET` | 随机字符串 | ✅ |
| `NEXTAUTH_URL` | https://your-project.vercel.app | ✅ |
| `ADMIN_EMAIL` | 你的管理员邮箱 | ✅ |
| `ADMIN_PASSWORD` | 你的管理员密码 | ✅ |
| `APP_URL` | https://your-project.vercel.app | ✅ |
| `SESSION_SECRET` | 随机字符串 | ✅ |
| `COOKIE_SECRET` | 随机字符串 | ✅ |

**注意：**
- 设置后点击 **Save**
- Vercel 会自动重新部署
- Production 列的 ✅ 表示该变量在生产环境可用

---

## 新功能部署后验证

### 1. 管理员消息删除功能
访问：`/admin/messages`
- 应该能看到消息列表
- 点击删除按钮，消息应该被永久删除
- 刷新页面，消息不再显示

### 2. 图片上传功能
访问：`/admin/images/upload`
- 选择图片
- 选择模块（Hero Banner、Products 等）
- 点击 Upload
- 图片应该保存到服务器

### 3. 横幅管理功能（新）
访问：`/admin/banners`
- 应该能看到横幅管理界面
- 可以上传新图片替换横幅
- 可以修改横幅标题、副标题
- 可以调整横幅顺序

### 4. Hero 组件横幅
- 访问首页
- 检查横幅轮播是否正常
- 确认图片显示正确

---

## 常见问题

### Q: 部署失败，显示 "Build Failed"
**A:** 检查 Build Logs 中的错误信息，常见问题：
- 依赖安装失败 → 检查 package.json
- TypeScript 错误 → 修复代码中的类型错误
- 内存不足 → 升级 Vercel 计划

### Q: 环境变量没有生效
**A:** 
1. 确保在 Vercel Dashboard 中设置了变量
2. 确保勾选了 **Production**
3. 设置后需要等待 Vercel 重新部署

### Q: 新代码没有生效
**A:**
1. 检查是否推送到了正确的分支（main）
2. 在 Vercel Dashboard 中手动点击 Redeploy
3. 清除浏览器缓存

### Q: 图片不显示
**A:**
1. 检查图片是否在 `public/` 目录下
2. 确认图片路径正确（如 `/images/banners/xxx.jpg`）
3. 重启开发服务器

---

## 快速验证命令

推送后，你可以用以下命令验证：

```bash
# 1. 确认推送成功
git log --oneline -5

# 2. 确认远程仓库有最新代码
git fetch origin
git log origin/main --oneline -5
```

---

## 部署成功后的操作

1. ✅ 访问生产环境网站
2. ✅ 测试管理员功能
3. ✅ 上传测试图片
4. ✅ 测试横幅管理
5. ✅ 检查所有页面显示正常
6. ✅ 清除浏览器缓存
7. ✅ 通知用户新功能上线
