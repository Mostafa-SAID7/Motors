# Motors - Enhanced Development Server Startup Script
# This script handles common startup issues and provides diagnostics

param(
    [int]$Port = 4200,
    [switch]$Verbose,
    [switch]$SkipDiagnostics,
    [switch]$CleanStart
)

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         Motors - Development Server Startup Script         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Color functions
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Error-Custom { Write-Host $args -ForegroundColor Red }
function Write-Warning-Custom { Write-Host $args -ForegroundColor Yellow }
function Write-Info { Write-Host $args -ForegroundColor Cyan }

# Diagnostics
if (-not $SkipDiagnostics) {
    Write-Info "🔍 Running diagnostics..."
    Write-Host ""
    
    # Check Node.js
    Write-Host "Checking Node.js..." -NoNewline
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Success " ✓ $nodeVersion"
    } else {
        Write-Error-Custom " ✗ Node.js not found"
        exit 1
    }
    
    # Check npm
    Write-Host "Checking npm..." -NoNewline
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Success " ✓ v$npmVersion"
    } else {
        Write-Error-Custom " ✗ npm not found"
        exit 1
    }
    
    # Check Angular CLI
    Write-Host "Checking Angular CLI..." -NoNewline
    $ngVersion = npx ng version 2>$null | Select-Object -First 1
    if ($ngVersion) {
        Write-Success " ✓ Found"
    } else {
        Write-Warning-Custom " ⚠ Angular CLI not found, will install"
    }
    
    # Check port availability
    Write-Host "Checking port $Port..." -NoNewline
    $portInUse = netstat -ano 2>$null | Select-String ":$Port"
    if ($portInUse) {
        Write-Warning-Custom " ⚠ Port $Port is in use"
        Write-Host "  Process: $($portInUse -split '\s+' | Select-Object -Last 1)"
        Write-Host ""
        Write-Warning-Custom "  Options:"
        Write-Host "  1. Kill the process: taskkill /PID <PID> /F"
        Write-Host "  2. Use different port: .\start-dev-enhanced.ps1 -Port 4300"
        Write-Host ""
        $response = Read-Host "  Kill process and continue? (y/n)"
        if ($response -eq 'y') {
            $pid = $portInUse -split '\s+' | Select-Object -Last 1
            taskkill /PID $pid /F | Out-Null
            Write-Success "  ✓ Process killed"
        } else {
            Write-Host "  Using port $($Port + 100) instead"
            $Port = $Port + 100
        }
    } else {
        Write-Success " ✓ Available"
    }
    
    # Check node_modules
    Write-Host "Checking dependencies..." -NoNewline
    if (Test-Path "node_modules/@angular/core") {
        Write-Success " ✓ Installed"
    } else {
        Write-Warning-Custom " ⚠ Dependencies not found"
        Write-Host ""
        Write-Info "📦 Installing dependencies..."
        npm install --legacy-peer-deps
        if ($LASTEXITCODE -ne 0) {
            Write-Error-Custom "Failed to install dependencies"
            exit 1
        }
        Write-Success "✓ Dependencies installed"
    }
    
    Write-Host ""
}

# Clean start option
if ($CleanStart) {
    Write-Info "🧹 Performing clean start..."
    Write-Host "  Removing node_modules..." -NoNewline
    Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
    Write-Success " ✓"
    
    Write-Host "  Removing package-lock.json..." -NoNewline
    Remove-Item package-lock.json -ErrorAction SilentlyContinue
    Write-Success " ✓"
    
    Write-Host "  Clearing Angular cache..." -NoNewline
    Remove-Item -Recurse -Force .angular/cache -ErrorAction SilentlyContinue
    Write-Success " ✓"
    
    Write-Host "  Clearing npm cache..." -NoNewline
    npm cache clean --force | Out-Null
    Write-Success " ✓"
    
    Write-Host "  Reinstalling dependencies..." -NoNewline
    npm install --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom " ✗ Failed"
        exit 1
    }
    Write-Success " ✓"
    Write-Host ""
}

# Start server
Write-Info "🚀 Starting development server on port $Port..."
Write-Host ""

if ($Verbose) {
    ng serve --port $Port --host 127.0.0.1 --poll=2000 --verbose
} else {
    ng serve --port $Port --host 127.0.0.1 --poll=2000
}

if ($LASTEXITCODE -ne 0) {
    Write-Error-Custom "❌ Server failed to start"
    Write-Host ""
    Write-Warning-Custom "Troubleshooting steps:"
    Write-Host "1. Check DIAGNOSTIC_GUIDE.md for solutions"
    Write-Host "2. Try clean start: .\start-dev-enhanced.ps1 -CleanStart"
    Write-Host "3. Try different port: .\start-dev-enhanced.ps1 -Port 4300"
    Write-Host "4. Check docs/TROUBLESHOOTING.md"
    exit 1
}
