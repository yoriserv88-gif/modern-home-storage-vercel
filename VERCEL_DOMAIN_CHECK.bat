@echo off
echo ========================================
echo Vercel域名配置检查清单
echo ========================================
echo.
echo 问题: 在Vercel中找不到Domains设置
echo.
echo 解决方案:
echo.
echo 1. 确认项目URL
echo    访问: https://vercel.com/dashboard
echo    您的项目URL应该是:
echo    https://modern-home-storage-vercel.vercel.app
echo.
echo 2. 尝试直接访问域名页面
echo    复制此链接到浏览器:
echo    https://vercel.com/您的用户名/modern-home-storage-vercel/settings/domains
echo.
echo 3. 检查界面元素
echo    a) 点击项目名称进入详情页
echo    b) 查找顶部导航: Overview | Deployments | Settings | Domains
echo    c) 或点击Settings，在左侧找Domains
echo.
echo 4. 使用搜索功能
echo    a) 在Vercel顶部搜索框输入"domains"
echo    b) 或输入"modern-home-storage-vercel domains"
echo.
echo 5. 权限检查
echo    a) 确保您是项目所有者
echo    b) 如果是团队项目，需要相应权限
echo.
echo 6. 备用方案: 使用Vercel CLI
echo    a) 安装: npm install -g vercel
echo    b) 登录: vercel login
echo    c) 添加域名: vercel domains add 您的域名
echo.
echo ========================================
echo 如果仍然找不到，可能是:
echo 1. Vercel界面更新，位置变化
echo 2. 项目类型限制（某些项目类型可能不支持自定义域名）
echo 3. 账户类型限制（免费账户完全支持自定义域名）
echo ========================================
echo.
echo 建议操作:
echo 1. 截图当前Vercel界面发给我
echo 2. 或描述您看到的界面元素
echo 3. 我可以提供更具体的指导
echo ========================================
pause