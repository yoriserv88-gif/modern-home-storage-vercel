# 将代码推送到 GitHub 的完整指南

## 方法 1：使用 GitHub Desktop（推荐）

### 步骤 1：安装 GitHub Desktop
1. 下载并安装：https://desktop.github.com/
2. 登录你的 GitHub 账号

### 步骤 2：添加现有项目
1. 打开 GitHub Desktop
2. 点击左上角 **File** → **Add Existing Repository**
3. 选择路径：`e:\kiro-amz\modern-home-storage-vercel`
4. 点击 **Add Repository**

### 步骤 3：检查仓库状态
- 左侧会显示你已修改的文件
- 如果没有显示，点击 **Repository** → **Add Existing Repository**

### 步骤 4：提交更改
1. 在左下角选择所有文件（或只选择需要提交的）
2. 在底部输入框填写提交信息：
   ```
   feat: add banner admin management
   ```
3. 点击 **Commit to main**

### 步骤 5：推送到 GitHub
1. 点击右上角的 **Push origin** 按钮
2. 如果是第一次推送，会弹出对话框要求创建远程仓库

### 步骤 6：创建 GitHub 仓库
1. 打开浏览器访问：https://github.com/new
2. 填写仓库信息：
   - Repository name: `modern-home-storage-vercel`
   - Description: `Modern Home Storage Website with Admin Dashboard`
   - Public/Private: 根据需要选择
   - **取消勾选** "Add README"
3. 点击 **Create repository**
4. 返回 GitHub Desktop，再次点击 **Push origin**

---

## 方法 2：使用命令行（需要 Git 安装）

### 步骤 1：安装 Git
1. 下载 Git：https://git-scm.com/download/win
2. 安装时选择 **"Use Git from Windows Command Prompt"**

### 步骤 2：配置 Git（第一次使用）
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 步骤 3：添加远程仓库
```bash
cd e:\kiro-amz\modern-home-storage-vercel
git remote add origin https://github.com/your-username/modern-home-storage-vercel.git
```

### 步骤 4：添加所有文件
```bash
git add .
```

### 步骤 5：提交更改
```bash
git commit -m "feat: add banner admin management and fix delete message feature"
```

### 步骤 6：推送到 GitHub
```bash
git push -u origin main
```

如果遇到错误，可能需要先拉取远程仓库：
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 方法 3：使用 VS Code（如果你使用 VS Code）

### 步骤 1：打开项目
1. 在 VS Code 中打开项目文件夹
2. 按 `Ctrl+Shift+G` 打开 Git 面板

### 步骤 2：添加并提交
1. 在 "Changes" 下方点击 `+` 号添加所有文件
2. 在消息框中输入提交信息
3. 点击 `✓` 按钮提交

### 步骤 3：推送到 GitHub
1. 点击顶部的 `...` 按钮
2. 选择 **Push**
3. 如果需要，选择远程仓库

---

## 检查是否成功

推送完成后，访问：
```
https://github.com/你的用户名/仓库名
```

你应该能看到你提交的文件，包括：
- `app/admin/banners/page.tsx` (新)
- `app/admin/messages/page.tsx` (修改)
- `app/api/contact/route.ts` (修改)
- `app/api/upload/route.ts` (新)
- `app/api/banners/route.ts` (新)
- `app/api/upload-banner/route.ts` (新)
- `components/Hero.tsx` (修改)
- `data/banners.ts` (修改)
- `BANNER_FIX.md` (新)
- `BANNER_MANAGER.md` (新)

---

## 部署到 Vercel

推送成功后，你可以自动部署到 Vercel：

1. 访问 https://vercel.com/new
2. 登录 GitHub
3. 找到你的仓库 `modern-home-storage-vercel`
4. 点击 **Import**
5. 配置环境变量（参考 `.env.example`）
6. 点击 **Deploy**

Vercel 会自动检测到每次 `git push` 并重新部署。
