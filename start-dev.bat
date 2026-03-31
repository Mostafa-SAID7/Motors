@echo off
REM Motors Development Server Startup Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         Motors - Angular 19 Car Showroom App              ║
echo ║                                                            ║
echo ║              Starting Development Server...               ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Check if port 4200 is in use
echo Checking if port 4200 is available...
netstat -ano | findstr :4200 >nul
if not errorlevel 1 (
    echo.
    echo WARNING: Port 4200 is already in use!
    echo.
    echo Options:
    echo 1. Kill the process using port 4200
    echo 2. Use a different port
    echo.
    set /p choice="Enter your choice (1 or 2): "
    
    if "%choice%"=="1" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4200') do (
            taskkill /PID %%a /F
            echo Process killed.
        )
    ) else if "%choice%"=="2" (
        set /p port="Enter port number (default 4300): "
        if "%port%"=="" set port=4300
        echo Starting on port %port%...
        call ng serve --port %port%
        pause
        exit /b 0
    )
)

REM Start the development server
echo.
echo Starting development server on http://localhost:4200
echo.
echo When prompted about analytics, press 'N' and Enter
echo.
echo Press Ctrl+C to stop the server
echo.

call ng serve

pause
