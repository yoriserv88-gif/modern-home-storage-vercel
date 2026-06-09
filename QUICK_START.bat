@echo off
echo ============================================
echo QUICK START - MODERN HOME STORAGE WEBSITE
echo ============================================
echo.

echo 1. Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo 2. Cleaning cache...
if exist ".next" rmdir /s /q .next >nul 2>&1

echo.
echo 3. Starting server on port 3002...
echo    Ignoring version warnings...
echo.

set PORT=3002
set NEXT_TELEMETRY_DISABLED=1

echo Starting Next.js development server...
call npm run dev -- -p %PORT% --no-lint

echo.
echo ============================================
echo If server starts successfully, access:
echo.
echo - Main site: http://localhost:%PORT%
echo - Admin: http://localhost:%PORT%/admin
echo - Contact: http://localhost:%PORT%/contact
echo - Messages: http://localhost:%PORT%/admin/messages
echo ============================================
echo.
pause