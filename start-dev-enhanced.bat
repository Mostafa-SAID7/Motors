@echo off
REM Motors - Enhanced Development Server Startup Script (Batch Version)
REM This script handles common startup issues and provides diagnostics

setlocal enabledelayedexpansion
set PORT=4200
set CLEAN_START=0

REM Parse arguments
if "%1"=="--clean" set CLEAN_START=1
if "%1"=="--port" set PORT=%2

cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         Motors - Development Server Startup Script         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js v18+
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] %NODE_VERSION%

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm not found
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] v%NPM_VERSION%

REM Check port availability
echo Checking port %PORT%...
netstat -ano | findstr :%PORT% >nul 2>&1
if not errorlevel 1 (
    echo [WARNING] Port %PORT% is already in use
    echo.
    echo Options:
    echo 1. Kill the process using the port
    echo 2. Use a different port: start-dev-enhanced.bat --port 4300
    echo.
    set /p KILL_PROCESS="Kill process and continue? (y/n): "
    if /i "!KILL_PROCESS!"=="y" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT%') do (
            taskkill /PID %%a /F >nul 2>&1
            echo [OK] Process killed
        )
    ) else (
        set /a PORT=%PORT%+100
        echo Using port !PORT! instead
    )
) else (
    echo [OK] Port %PORT% is available
)

REM Check dependencies
echo Checking dependencies...
if exist "node_modules\@angular\core" (
    echo [OK] Dependencies installed
) else (
    echo [WARNING] Dependencies not found
    echo.
    echo Installing dependencies...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
)

REM Clean start option
if %CLEAN_START%==1 (
    echo.
    echo Performing clean start...
    echo Removing node_modules...
    rmdir /s /q node_modules >nul 2>&1
    echo [OK]
    
    echo Removing package-lock.json...
    del package-lock.json >nul 2>&1
    echo [OK]
    
    echo Clearing Angular cache...
    rmdir /s /q .angular\cache >nul 2>&1
    echo [OK]
    
    echo Clearing npm cache...
    call npm cache clean --force >nul 2>&1
    echo [OK]
    
    echo Reinstalling dependencies...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK]
)

REM Start server
echo.
echo Starting development server on port %PORT%...
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  Server starting... Press Ctrl+C to stop                   ║
echo ║  Open browser to: http://localhost:%PORT%                  ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

call ng serve --port %PORT% --host 127.0.0.1 --poll=2000

if errorlevel 1 (
    echo.
    echo [ERROR] Server failed to start
    echo.
    echo Troubleshooting steps:
    echo 1. Check DIAGNOSTIC_GUIDE.md for solutions
    echo 2. Try clean start: start-dev-enhanced.bat --clean
    echo 3. Try different port: start-dev-enhanced.bat --port 4300
    echo 4. Check docs/TROUBLESHOOTING.md
    echo.
    pause
    exit /b 1
)

endlocal
