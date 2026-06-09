@echo off
echo ========================================
echo 安装项目依赖
echo ========================================
echo.

echo 检查Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装
    echo 请先安装 Node.js v18+ 
    echo 下载: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js 版本:
node --version

echo.
echo 安装依赖包...
echo 这可能需要几分钟时间...
echo.

REM 安装核心依赖
echo 1. 安装核心依赖...
call npm.cmd install next react react-dom lucide-react --save

REM 安装开发依赖
echo.
echo 2. 安装开发依赖...
call npm.cmd install @types/node @types/react @types/react-dom autoprefixer postcss tailwindcss typescript --save-dev

REM 安装后台管理依赖
echo.
echo 3. 安装后台管理依赖...
call npm.cmd install next-auth @prisma/client prisma cloudinary bcryptjs uuid --save
call npm.cmd install @types/bcryptjs @types/uuid --save-dev

echo.
echo ✅ 所有依赖安装完成！
echo.
echo 现在可以运行 START_SERVER.bat 启动网站
echo.
pause