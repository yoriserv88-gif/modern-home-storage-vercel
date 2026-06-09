@echo off
echo ========================================
echo Netlify 快速部署脚本
echo ========================================
echo.
echo 项目: Modern Home Storage Website
echo 位置: e:\kiro-amz\modern-home-storage-vercel
echo.
echo === 部署前检查 ===
echo 1. 确保已删除:
echo    - .next/ 目录
echo    - node_modules/ 目录 (可选)
echo    - vercel.json 文件
echo.
echo 2. 确认文件存在:
echo    - netlify.toml ✅
echo    - package.json ✅
echo    - next.config.js ✅
echo.
echo === 部署步骤 ===
echo.
echo 步骤1: 注册Netlify
echo     访问: https://app.netlify.com/signup
echo     推荐使用GitHub账户注册
echo.
echo 步骤2: 创建新站点
echo     a) 登录Netlify
echo     b) 点击 "Add new site"
echo     c) 选择 "Import an existing project"
echo.
echo 步骤3: 选择部署方式
echo     [推荐] 方式A: 通过GitHub
echo         1. 连接GitHub账户
echo         2. 选择仓库: modern-home-storage-vercel
echo         3. 点击 "Deploy site"
echo.
echo     方式B: 手动拖放
echo         1. 点击 "Deploy manually"
echo         2. 拖放项目文件夹到上传区域
echo.
echo 步骤4: 等待部署
echo     首次部署: 3-5分钟
echo     获得URL: https://随机名称.netlify.app
echo.
echo 步骤5: 绑定自定义域名
echo     1. Site settings → Domain management
echo     2. Add custom domain: www.hiskiwuu.com
echo     3. 按照提示配置DNS
echo.
echo === DNS配置 ===
echo Netlify会显示:
echo CNAME记录:
echo   名称: www
echo   值: 您的站点名称.netlify.app
echo.
echo 或A记录 (根域名):
echo   名称: @
echo   值: 75.2.60.5
echo.
echo === 预计时间 ===
echo 部署: 5分钟
echo DNS生效: 5-30分钟
echo SSL证书: 15分钟
echo 完全生效: 1-2小时
echo.
echo ========================================
echo 优势 vs Vercel:
echo 1. 更好的中国访问性
echo 2. 无TLS版本问题
echo 3. 配置更简单
echo 4. 免费自动HTTPS
echo ========================================
pause