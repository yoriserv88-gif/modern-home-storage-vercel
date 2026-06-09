@echo off
echo ========================================
echo 启动 Modern Home Storage 网站
echo ========================================
echo.

echo 步骤1: 检查环境...
where node >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装或不在PATH中
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 已安装

echo.
echo 步骤2: 检查依赖...
if not exist "node_modules" (
    echo ⚠️ node_modules 目录不存在
    echo 正在安装依赖...
    
    REM 使用cmd直接调用npm，避免PowerShell限制
    call npm.cmd install --loglevel=error
    
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        echo 请手动执行: npm install
        pause
        exit /b 1
    )
    echo ✅ 依赖安装完成
) else (
    echo ✅ node_modules 已存在
)

echo.
echo 步骤3: 检查数据库...
if not exist "prisma\dev.db" (
    echo ⚠️ 数据库文件不存在
    echo 正在初始化数据库...
    
    call npx.cmd prisma db push --accept-data-loss
    if errorlevel 1 (
        echo ❌ 数据库初始化失败
        pause
        exit /b 1
    )
    
    echo ✅ 数据库初始化完成
) else (
    echo ✅ 数据库文件已存在
)

echo.
echo 步骤4: 启动开发服务器...
echo.
echo ========================================
echo 网站将在以下地址启动:
echo.
echo 前端网站: http://localhost:3000
echo 后台登录: http://localhost:3000/admin/login
echo.
echo 登录凭证:
echo 邮箱: admin@example.com
echo 密码: admin123
echo ========================================
echo.
echo 按 Ctrl+C 停止服务器
echo.

REM 启动开发服务器
call npm.cmd run dev