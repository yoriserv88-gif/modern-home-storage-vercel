@echo off
echo ============================================
echo MODERN HOME STORAGE WEBSITE - QUICK FIX
echo ============================================
echo.

echo 1. Stopping all existing Node processes...
taskkill /F /IM node.exe >nul 2>&1
echo    Done.

echo.
echo 2. Cleaning build cache...
if exist ".next" rmdir /s /q .next >nul 2>&1
if exist ".turbo" rmdir /s /q .turbo >nul 2>&1
if exist "build.log" del build.log >nul 2>&1
echo    Done.

echo.
echo 3. Starting development server on port 3001...
echo    This will take a moment...
echo.

set PORT=3001
set NODE_ENV=development

start cmd /k "npm run dev -- -p 3001"

echo.
echo ============================================
echo SERVER STARTED ON PORT 3001
echo.
echo Please open: http://localhost:3001
echo.
echo If port 3001 doesn't work, try:
echo - http://localhost:3002
echo - http://localhost:3003
echo ============================================
echo.
echo Waiting 10 seconds for server to start...
timeout /t 10 /nobreak >nul

echo.
echo Attempting to open browser...
start http://localhost:3001

echo.
echo Press any key to keep this window open...
pause >nul