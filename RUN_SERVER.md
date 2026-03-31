# How to Run Motors Development Server

## Quick Start

### Option 1: Using npm (Recommended)
```bash
cd Motors
npm start
```

When prompted about analytics, press **N** and Enter to skip.

### Option 2: Using Enhanced Startup Script (Recommended for Issues)

**Windows PowerShell:**
```powershell
.\start-dev-enhanced.ps1
```

Features:
- Automatic diagnostics
- Port conflict detection
- Dependency checking
- Clean start option: `.\start-dev-enhanced.ps1 -CleanStart`
- Custom port: `.\start-dev-enhanced.ps1 -Port 4300`

**Windows CMD:**
```cmd
start-dev-enhanced.bat
```

Features:
- Automatic diagnostics
- Port conflict detection
- Clean start: `start-dev-enhanced.bat --clean`
- Custom port: `start-dev-enhanced.bat --port 4300`

### Option 3: Using ng serve directly
```bash
cd Motors
ng serve
```

When prompted about analytics, press **N** and Enter to skip.

### Option 4: Skip analytics prompt
```bash
cd Motors
ng serve --poll=2000
```

## Troubleshooting Connection Issues

### Issue: ERR_CONNECTION_REFUSED on localhost:4200

**See `DIAGNOSTIC_GUIDE.md` for complete troubleshooting steps.**

Quick solutions:
```powershell
# Check if port 4200 is in use
netstat -ano | findstr :4200

# If port is in use, kill the process
taskkill /PID <PID> /F
```

**Solution 2: Use a different port**
```bash
ng serve --port 4300
```

**Solution 3: Clear cache and rebuild**
```bash
# Delete node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall dependencies
npm install --legacy-peer-deps

# Start server
npm start
```

**Solution 4: Check firewall**
- Windows Firewall might be blocking localhost
- Go to Windows Defender Firewall > Allow an app through firewall
- Add Node.js to allowed apps

**Solution 5: Disable IPv6**
```bash
ng serve --host 127.0.0.1 --port 4200
```

## Accessing the Application

Once the server is running, you should see:
```
✔ Compiled successfully.
✔ Build complete. Watching for file changes...

Application bundle generated successfully. 153.23 kB (gzip: 45.23 kB)

Watch mode enabled. Watching for file changes...
Local:   http://localhost:4200/
```

Then open your browser and go to: **http://localhost:4200**

## Common Error Messages

### "Port 4200 is already in use"
```bash
# Find and kill the process
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Or use a different port
ng serve --port 4300
```

### "Cannot find module '@angular/...'"
```bash
npm install --legacy-peer-deps
```

### "ENOENT: no such file or directory"
```bash
# Rebuild node_modules
npm install --legacy-peer-deps
```

### "Compilation failed"
```bash
# Clear Angular cache
ng cache clean

# Rebuild
ng serve
```

## Development Server Features

- **Hot Module Replacement (HMR)**: Changes auto-reload
- **Source Maps**: Debug TypeScript in browser
- **Proxy Support**: For API calls
- **Watch Mode**: Automatic recompilation

## Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Sources tab
3. Set breakpoints in TypeScript
4. Step through code

## Stopping the Server

Press **Ctrl + C** in the terminal to stop the development server.

## Production Build

```bash
npm run build
```

Output will be in `dist/Motors/`

## Deployment

See `docs/DEPLOYMENT.md` for deployment options.

---

**If you still have issues:**
1. Check `docs/TROUBLESHOOTING.md`
2. Review `docs/FAQ.md`
3. Check GitHub issues
4. Create a new issue with details
