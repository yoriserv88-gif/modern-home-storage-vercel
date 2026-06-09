@echo off
echo Starting modern-home-storage-website...
echo.

REM 检查node_modules是否存在
if not exist "node_modules" (
    echo Error: node_modules directory not found!
    echo Please run: npm install
    pause
    exit /b 1
)

REM 检查端口是否被占用
echo Checking port 3000...
netstat -ano | findstr :3000 > nul
if %ERRORLEVEL% == 0 (
    echo Port 3000 is already in use!
    echo.
    echo Options:
    echo 1. Kill process using port 3000
    echo 2. Use different port
    echo 3. Exit
    echo.
    set /p choice="Choose option (1-3): "
    
    if "%choice%"=="1" (
        echo Killing process on port 3000...
        for /f "tokens=5" %%i in ('netstat -ano ^| findstr :3000') do (
            taskkill /PID %%i /F
        )
        timeout /t 2 /nobreak > nul
    ) else if "%choice%"=="2" (
        set /p newport="Enter new port (default: 3001): "
        if "%newport%"=="" set newport=3001
        set PORT=%newport%
        echo Starting server on port %PORT%...
        call npm run dev -- -p %PORT%
        pause
        exit /b
    ) else (
        echo Exiting...
        pause
        exit /b
    )
)

REM 设置环境变量
set NODE_ENV=development
set PORT=3000

echo.
echo ============================================
echo Starting Development Server...
echo Website: http://localhost:%PORT%
echo Admin Panel: http://localhost:%PORT%/admin
echo Health Check: http://localhost:%PORT%/api/health
echo ============================================
echo.

REM 启动开发服务器
echo Starting Next.js development server...
call npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed to start server!
    echo.
    echo Troubleshooting:
    echo 1. Make sure all dependencies are installed
    echo 2. Check if port 3000 is free
    echo 3. Try: npm install --force
    echo 4. Check for TypeScript errors
    pause
    exit /b %ERRORLEVEL%
)

pause