@echo off
echo ============================================
echo REBUILDING AND STARTING SERVER
echo ============================================
echo.

echo 1. Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
echo    Done.

echo.
echo 2. Cleaning build cache...
if exist ".next" rmdir /s /q .next >nul 2>&1
echo    Done.

echo.
echo 3. Starting server on port 3000...
echo.

set PORT=3000
set NEXT_TELEMETRY_DISABLED=1

npm run dev -- -p %PORT%

pause