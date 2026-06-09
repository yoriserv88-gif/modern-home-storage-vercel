@echo off
echo ============================================
echo UPDATING NEXT.JS AND DEPENDENCIES
echo ============================================
echo.

echo 1. Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
echo    Done.

echo.
echo 2. Updating Next.js and React to latest versions...
call npm install next@latest react@latest react-dom@latest --legacy-peer-deps

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Update failed! Trying alternative method...
    echo.
    call npm install next@^15.0.0 react@^18.3.0 react-dom@^18.3.0 --legacy-peer-deps
)

echo.
echo 3. Cleaning build cache...
if exist ".next" rmdir /s /q .next >nul 2>&1
if exist ".turbo" rmdir /s /q .turbo >nul 2>&1

echo.
echo 4. Checking updated versions...
call npm list next react react-dom

echo.
echo ============================================
echo UPDATE COMPLETE
echo.
echo Next steps:
echo 1. Run: npm run dev -- -p 3001
echo 2. Or run: RESTART_SERVER.bat
echo ============================================
echo.
pause