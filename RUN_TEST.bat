@echo off
echo Running tests for modern-home-storage-website...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Error: node_modules directory not found!
    echo Please run: npm install
    pause
    exit /b 1
)

REM Check if jest is installed
if not exist "node_modules\.bin\jest.cmd" (
    echo Jest is not installed. Installing test dependencies...
    call npm install --save-dev jest jest-environment-jsdom @testing-library/jest-dom @testing-library/react @types/jest ts-jest
    echo.
)

echo Running tests...
call npx jest

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Tests failed with exit code %ERRORLEVEL%
    pause
    exit /b %ERRORLEVEL%
) else (
    echo.
    echo All tests passed!
)

pause