# Motors - Diagnostic & Connection Guide

## Quick Diagnostic Checklist

### 1. Verify Node.js & npm Installation
```powershell
node --version    # Should be v18+ or v20+
npm --version     # Should be v10+
```

### 2. Verify Dependencies Are Installed
```powershell
cd Motors
ls node_modules/@angular/core    # Should exist
```

### 3. Check Port 4200 Availability
```powershell
netstat -ano | findstr :4200
# If output shows a PID, the port is in use
```

### 4. Verify Angular CLI
```powershell
npx ng version
# Should show Angular 21.2.0+
```

---

## ERR_CONNECTION_REFUSED - Complete Solution

### Root Causes
1. **Dev server not starting** - Angular CLI fails silently
2. **Port 4200 blocked** - Another process using the port
3. **Firewall blocking** - Windows Firewall blocking localhost
4. **Dependencies missing** - node_modules incomplete
5. **Analytics prompt hanging** - CLI waiting for input

### Solution Steps (In Order)

#### Step 1: Clean Install (Most Effective)
```powershell
cd Motors

# Remove old installations
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Fresh install
npm install --legacy-peer-deps

# Verify installation
npm list @angular/core
```

#### Step 2: Disable Analytics Permanently
```powershell
# Already done in .angular/config.json
# Verify it exists:
cat Motors\.angular\config.json
```

#### Step 3: Start with Explicit Configuration
```powershell
cd Motors

# Option A: With explicit host and port
ng serve --host 127.0.0.1 --port 4200 --poll=2000

# Option B: Using npm script
npm start

# Option C: Different port if 4200 is blocked
ng serve --port 4300
```

#### Step 4: Check for Port Conflicts
```powershell
# Find what's using port 4200
netstat -ano | findstr :4200

# If something is using it, kill it
taskkill /PID <PID_NUMBER> /F

# Then try starting again
ng serve
```

#### Step 5: Firewall Configuration
1. Open **Windows Defender Firewall**
2. Click **Allow an app through firewall**
3. Click **Change settings**
4. Click **Allow another app**
5. Browse to: `C:\Program Files\nodejs\node.exe`
6. Click **Add**
7. Click **OK**

#### Step 6: Full Reset (Nuclear Option)
```powershell
cd Motors

# Clear everything
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
Remove-Item -Recurse -Force .angular/cache

# Clear npm cache
npm cache clean --force

# Fresh install
npm install --legacy-peer-deps

# Clear Angular cache
ng cache clean

# Start fresh
ng serve --poll=2000
```

---

## Expected Output When Server Starts Successfully

```
✔ Compiled successfully.
✔ Build complete. Watching for file changes...

Application bundle generated successfully. 153.23 kB (gzip: 45.23 kB)

Watch mode enabled. Watching for file changes...
Local:   http://localhost:4200/
```

Then open browser to: **http://localhost:4200**

---

## Verification Checklist

- [ ] Node.js v18+ installed
- [ ] npm v10+ installed
- [ ] node_modules folder exists
- [ ] @angular/core in node_modules
- [ ] Port 4200 is free (or using different port)
- [ ] .angular/config.json has analytics: false
- [ ] No firewall blocking localhost
- [ ] npm start shows "Compiled successfully"
- [ ] Browser shows Motors application

---

## If Still Not Working

### Check Logs
```powershell
# Run with verbose output
ng serve --verbose

# Check for specific errors
ng serve 2>&1 | Tee-Object -FilePath debug.log
```

### Check System Resources
```powershell
# Check available memory
Get-WmiObject Win32_OperatingSystem | Select-Object FreePhysicalMemory

# Check disk space
Get-Volume
```

### Alternative: Use Different Port
```powershell
ng serve --port 4300
# Then open http://localhost:4300
```

### Last Resort: Rebuild Everything
```powershell
# Delete everything except src and public
Remove-Item -Recurse -Force node_modules, dist, .angular/cache
Remove-Item package-lock.json

# Reinstall from scratch
npm install --legacy-peer-deps

# Build first
ng build

# Then serve
ng serve
```

---

## Success Indicators

✅ **Server Started Successfully**
- Terminal shows "Compiled successfully"
- No error messages
- Shows "Local: http://localhost:4200/"

✅ **Application Loaded**
- Browser shows Motors logo
- Navigation menu visible
- No console errors (F12)

✅ **Hot Reload Working**
- Edit a file and save
- Browser auto-refreshes
- Changes appear immediately

---

## Quick Reference Commands

```powershell
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check Angular version
ng version

# Clear cache
ng cache clean

# Serve on different port
ng serve --port 4300

# Serve with polling (for VMs/WSL)
ng serve --poll=2000

# Serve with specific host
ng serve --host 0.0.0.0 --port 4200
```

---

**Last Updated**: March 2026
**For Issues**: See docs/TROUBLESHOOTING.md or create GitHub issue

