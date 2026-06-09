@echo off
echo ============================================
echo FIXING CONTACT PAGE AND RESTARTING
echo ============================================
echo.

echo 1. Stopping server...
taskkill /F /IM node.exe >nul 2>&1
echo    Done.

echo.
echo 2. Cleaning build cache...
if exist ".next" rmdir /s /q .next >nul 2>&1
echo    Done.

echo.
echo 3. Starting server on port 3003...
echo    (Using different port to avoid conflicts)
echo.

set PORT=3003
set NEXT_TELEMETRY_DISABLED=1

echo Starting development server...
start cmd /k "npm run dev -- -p %PORT%"

echo.
echo ============================================
echo SERVER STARTING ON PORT 3003
echo.
echo Please access:
echo - Main site: http://localhost:%PORT%
echo - Contact page: http://localhost:%PORT%/contact
echo - Admin: http://localhost:%PORT%/admin
echo ============================================
echo.
echo Waiting 10 seconds for server to start...
timeout /t 10 /nobreak >nul

echo.
echo Opening contact page for testing...
start http://localhost:%PORT%/contact

echo.
echo Press any key to keep this window open...
pause >nul