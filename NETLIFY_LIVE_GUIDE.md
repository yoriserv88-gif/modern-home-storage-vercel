# Netlify 实时部署操作指南
# 请按顺序执行以下步骤

## 📋 准备工作完成 ✅
- [x] 项目清理完成
- [x] Vercel配置文件已删除
- [x] Netlify配置文件已创建
- [x] 项目结构完整 (113个文件)
- [x] GitHub仓库已存在

## 🚀 开始部署

### 步骤1: 打开Netlify注册页面
**点击链接**: https://app.netlify.com/signup

**选择注册方式**:
```
☑️ 推荐: GitHub账户 (一键授权)
☐ 邮箱注册
☐ Google账户
```

### 步骤2: 登录Netlify控制台
注册后自动跳转到: https://app.netlify.com

**界面应该显示**:
```
+ Add new site (按钮)
Recent sites (空)
Teams & members
```

### 步骤3: 创建新站点
1. **点击** "Add new site"
2. **选择** "Import an existing project"
3. **点击** "GitHub" 图标

### 步骤4: 授权GitHub访问
**第一次使用需要授权**:
1. 点击 "Configure the Netlify app on GitHub"
2. 选择授权范围:
   ```
   ☑️ 推荐: All repositories (所有仓库)
   ☐ 或选择: Only select repositories
   ```
3. 点击 "Install"

### 步骤5: 选择仓库
在仓库列表中:
1. **找到**: `modern-home-storage-vercel`
2. **点击** 选择该仓库

### 步骤6: 配置部署设置
**检查自动填充的设置**:
```
Build command: npm run build ✅
Publish directory: .next ✅
Base directory: (留空) ✅
```

**环境变量**:
- 不需要添加任何环境变量

**点击**: "Deploy site"

### 步骤7: 等待部署
**观察部署日志** (自动显示):
```
1. ⏳ Preparing deploy...
2. 📦 Installing dependencies...
3. 🔨 Building site...
4. ✅ Deploying to Netlify...
5. 🎉 Published
```

**预计时间**: 3-5分钟

### 步骤8: 获取网站URL
部署成功后显示:
```
Site deploy in progress
↓
Site is live ✨
https://modern-home-storage-vercel.netlify.app
```

**点击URL测试访问**

## 🔧 故障排除

### 如果构建失败:
**查看构建日志**:
1. 点击 "Deploys" 标签
2. 点击失败的部署
3. 查看错误信息

**常见问题**:
1. **Node版本问题**:
   ```
   错误: Node版本不兼容
   解决: 在Netlify设置中指定Node 18
   ```

2. **依赖安装失败**:
   ```
   错误: npm install失败
   解决: 检查package.json依赖
   ```

3. **构建命令错误**:
   ```
   错误: npm run build失败
   解决: 确保next.config.js配置正确
   ```

### 如果页面显示404:
1. 检查 `netlify.toml` 配置
2. 确保 `publish = ".next"`
3. 检查Next.js路由配置

## 🌐 绑定自定义域名

### 步骤A: 添加自定义域名
1. 进入站点: Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入: `www.hiskiwuu.com`
4. 点击 "Verify"

### 步骤B: 配置DNS
Netlify显示需要添加的DNS记录:

**选项1: CNAME记录** (推荐):
```
类型: CNAME
名称: www
值: modern-home-storage-vercel.netlify.app
TTL: 自动
```

**选项2: A记录** (根域名):
```
类型: A  
名称: @
值: 75.2.60.5
```

### 步骤C: 等待SSL证书
1. Netlify自动申请Let's Encrypt证书
2. 等待: 5-15分钟
3. 检查: 绿色锁图标 ✅

## 📞 实时支持

### 如果卡在某个步骤:
1. **截图当前界面** 发给我
2. **描述遇到的问题**
3. **提供错误信息**

### 在线资源:
- Netlify文档: https://docs.netlify.com/
- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/
- 社区支持: https://answers.netlify.com/

## ✅ 完成检查清单

部署完成后检查:
- [ ] 访问 Netlify URL 正常
- [ ] 所有页面显示正常
- [ ] 图片加载正常
- [ ] HTTPS 绿色锁图标
- [ ] 绑定自定义域名 (可选)
- [ ] 测试表单提交 (如果有)

## ⏱️ 时间线
- 注册: 2分钟
- 部署: 5分钟  
- DNS生效: 5-30分钟
- SSL证书: 15分钟
- 完全可用: 1小时内

**现在开始第一步: 打开 https://app.netlify.com/signup**