@echo off
echo ===================================================
echo   验证 Admin Dashboard 链接修复
echo ===================================================
echo.
echo 问题：Dashboard 中的 Manage 按钮出现 404 错误
echo 原因：链接指向不存在的页面
echo.
echo 已修复的问题：
echo ---------------------------------------------------
echo 1. Hero Banner → /admin/images/hero (不存在)
echo    修复为 → /admin/images/manage?module=Hero Banner
echo.
echo 2. Products Gallery → /admin/images/products (不存在)
echo    修复为 → /admin/images/manage?module=Products
echo.
echo 3. Factory Images → /admin/images/factory (不存在)
echo    修复为 → /admin/images/manage?module=Factory
echo.
echo 4. Partner Logos → /admin/images/partners (不存在)
echo    修复为 → /admin/images/manage?module=Partners
echo.

echo 修复的文件：
echo ---------------------------------------------------
echo 1. app/admin/dashboard/page.tsx
echo    - 修改了 websiteModules 数组中的路径
echo.
echo 2. app/admin/images/manage/page.tsx
echo    - 添加了 URL 参数支持
echo    - 自动根据参数过滤模块
echo    - 更新了页面标题
echo    - 添加了清除过滤链接
echo.

echo 验证步骤：
echo ---------------------------------------------------
echo 1. 启动开发服务器：
echo    npm run dev
echo.
echo 2. 访问管理员登录：
echo    http://localhost:3000/admin/dashboard
echo    或 http://localhost:3000/admin/login
echo.
echo 3. 使用默认凭证登录：
echo    邮箱：admin@example.com
echo    密码：admin123
echo.
echo 4. 在 Dashboard 页面，测试每个模块：
echo    - Hero Banner → 点击 Manage
echo    - Products Gallery → 点击 Manage
echo    - Factory Images → 点击 Manage
echo    - Partner Logos → 点击 Manage
echo.
echo 5. 验证每个链接：
echo    - 不应出现 404 错误
echo    - 页面应正确加载
echo    - 应显示对应模块的图片
echo    - 标题应包含模块名称
echo    - 应有 Clear filter 链接
echo.

echo 修复的技术细节：
echo ---------------------------------------------------
echo 1. URL 参数读取：
echo    const searchParams = useSearchParams()
echo    const moduleParam = searchParams.get('module')
echo.
echo 2. 自动过滤：
echo    useEffect(() => {
echo      if (moduleParam) setFilterModule(moduleParam)
echo    }, [searchParams])
echo.
echo 3. 条件标题：
echo    <h1>Manage Images {filterModule !== 'all' && `- ${filterModule}`}</h1>
echo.
echo 4. 清除过滤链接：
echo    {filterModule !== 'all' && (
echo      <Link href="/admin/images/manage">Clear filter</Link>
echo    )}
echo.

echo 如果问题仍然存在：
echo ---------------------------------------------------
echo 1. 检查修改的文件是否正确保存
echo 2. 重启开发服务器：Ctrl+C 然后 npm run dev
echo 3. 清除浏览器缓存
echo 4. 检查浏览器控制台是否有错误
echo.

echo 部署到生产环境：
echo ---------------------------------------------------
echo 1. 提交修改到 GitHub：
echo    git add app/admin/dashboard/page.tsx
echo    git add app/admin/images/manage/page.tsx
echo    git commit -m "修复 Admin Dashboard 中的 404 链接错误"
echo    git push origin main
echo.
echo 2. Vercel 会自动部署
echo 3. 等待 1-2 分钟
echo 4. 访问生产环境验证
echo.

pause