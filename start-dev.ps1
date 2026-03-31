# Motors Development Server Startup Script for PowerShell

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "║         Motors - Angular 19 Car Showroom App              ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "║              Starting Development Server...               ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Check if port 4200 is in use
Write-Host "Checking if port 4200 is available..." -ForegroundColor Yellow
$port4200 = Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue

if ($port4200) {
    Write-Host ""
    Write-Host "WARNING: Port 4200 is already in use!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "1. Kill the process using port 4200"
    Write-Host "2. Use a different port"
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1 or 2)"
    
    if ($choice -eq "1") {
        $process = Get-Process | Where-Object { $_.Id -eq $port4200.OwningProcess }
        if ($process) {
            Stop-Process -Id $process.Id -Force
            Write-Host "Process killed." -ForegroundColor Green
        }
    } elseif ($choice -eq "2") {
        $port = Read-Host "Enter port number (default 4300)"
        if ([string]::IsNullOrEmpty($port)) { $port = 4300 }
        Write-Host ""
        Write-Host "Starting on port $port..." -ForegroundColor Green
        Write-Host ""
        ng serve --port $port
        Read-Host "Press Enter to exit"
        exit 0
    }
}

# Start the development server
Write-Host ""
Write-Host "Starting development server on http://localhost:4200" -ForegroundColor Green
Write-Host ""
Write-Host "When prompted about analytics, press 'N' and Enter" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

ng serve

Read-Host "Press Enter to exit"
