@echo off
echo ============================================
echo RESTARTING MODERN HOME STORAGE SERVER
echo ============================================
echo.

echo 1. Stopping server...
taskkill /F /IM node.exe >nul 2>&1
echo    Done.

echo.
echo 2. Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo.
echo 3. Starting development server...
echo    This will take a moment...
echo.

set PORT=3001
set NODE_ENV=development

start cmd /k "npm run dev -- -p %PORT%"

echo.
echo ============================================
echo SERVER RESTARTED
echo.
echo Please access:
echo - Main site: http://localhost:%PORT%
echo - Admin login: http://localhost:%PORT%/admin
echo - Messages: http://localhost:%PORT%/admin/messages
echo ============================================
echo.
echo Waiting 8 seconds for server to start...
timeout /t 8 /nobreak >nul

echo.
echo Opening admin messages page...
start http://localhost:%PORT%/admin/messages

echo.
echo Press any key to keep this window open...
pause >nul