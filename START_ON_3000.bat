@echo off
echo ============================================
echo Starting Modern Home Storage Website
echo ============================================
echo.
echo Stopping any existing processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo Cleaning build cache...
if exist ".next" rmdir /s /q .next >nul 2>&1

echo.
echo Starting server on port 3000...
echo.
npm run dev -- -p 3000

pause