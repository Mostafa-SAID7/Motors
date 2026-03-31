# Motors - Complete Startup Guide

## ✅ GitHub Repository

Your project has been successfully pushed to:
**https://github.com/Mostafa-SAID7/Motors**

## 🚀 Starting the Development Server

### Method 1: Using npm (Easiest)

```bash
cd Motors
npm start
```

**When prompted about analytics:**
- Press **N** (for No)
- Press **Enter**

The server will start on `http://localhost:4200`

### Method 2: Using Windows Batch File

Double-click: `start-dev.bat`

This will:
- Check if dependencies are installed
- Check if port 4200 is available
- Start the development server
- Handle port conflicts automatically

### Method 3: Using PowerShell Script

```powershell
# First, allow script execution (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then run the script
.\start-dev.ps1
```

### Method 4: Using ng serve directly

```bash
cd Motors
ng serve
```

## 🔧 Fixing Connection Issues

### Issue: ERR_CONNECTION_REFUSED

**This means the server is not running or port 4200 is blocked.**

#### Solution 1: Check if port 4200 is in use

```powershell
# Check what's using port 4200
netstat -ano | findstr :4200

# If something is using it, kill the process
taskkill /PID <PID> /F
```

#### Solution 2: Use a different port

```bash
ng serve --port 4300
```

Then visit: `http://localhost:4300`

#### Solution 3: Clear cache and reinstall

```bash
# Delete node_modules
rm -r node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps

# Start
npm start
```

#### Solution 4: Check Windows Firewall

1. Open **Windows Defender Firewall**
2. Click **Allow an app through firewall**
3. Click **Change settings**
4. Click **Allow another app**
5. Find and add **Node.js**
6. Click **Add**

#### Solution 5: Use localhost IP directly

```bash
ng serve --host 127.0.0.1 --port 4200
```

Then visit: `http://127.0.0.1:4200`

## ✅ Successful Server Start

When the server starts successfully, you'll see:

```
✔ Compiled successfully.
✔ Build complete. Watching for file changes...

Application bundle generated successfully. 153.23 kB (gzip: 45.23 kB)

Watch mode enabled. Watching for file changes...
Local:   http://localhost:4200/
```

## 🌐 Accessing the Application

Open your browser and go to:
- **http://localhost:4200** (default)
- **http://127.0.0.1:4200** (if localhost doesn't work)
- **http://localhost:4300** (if using different port)

## 📱 Available Routes

| URL | Page |
|-----|------|
| `/` | Dashboard |
| `/cars` | Cars List |
| `/cars/:id` | Car Details |
| `/cars/add` | Add Car |
| `/cars/:id/edit` | Edit Car |

## 🛑 Stopping the Server

Press **Ctrl + C** in the terminal

## 🔄 Hot Module Replacement

Changes to files will automatically reload in the browser. No need to restart!

## 🐛 Debugging

### Using Chrome DevTools

1. Open Chrome DevTools: **F12**
2. Go to **Sources** tab
3. Find your TypeScript files
4. Set breakpoints
5. Step through code

### Using Angular DevTools

1. Install [Angular DevTools Extension](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbco)
2. Open DevTools: **F12**
3. Go to **Angular** tab
4. Inspect components and services

## 📊 Performance

The development server includes:
- **Hot Module Replacement (HMR)** - Auto-reload on changes
- **Source Maps** - Debug TypeScript in browser
- **Watch Mode** - Automatic recompilation
- **Development Optimizations** - Fast builds

## 🚀 Production Build

```bash
npm run build
```

Output: `dist/Motors/`

## 📚 Documentation

- **RUN_SERVER.md** - Server startup guide
- **docs/TROUBLESHOOTING.md** - Common issues
- **docs/FAQ.md** - Frequently asked questions
- **QUICKSTART.md** - Quick start guide

## 🆘 Still Having Issues?

### Check These Files

1. **RUN_SERVER.md** - Detailed server guide
2. **docs/TROUBLESHOOTING.md** - Common problems
3. **docs/FAQ.md** - 50+ FAQs

### Common Commands

```bash
# Clear Angular cache
ng cache clean

# Rebuild
ng serve

# Use different port
ng serve --port 4300

# Disable HMR
ng serve --hmr=false

# Enable polling (for file watchers)
ng serve --poll=2000
```

### Check System

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check Angular CLI version
ng version

# Check if port is available
netstat -ano | findstr :4200
```

## 🎯 Next Steps

1. ✅ Start the server
2. ✅ Open http://localhost:4200
3. ✅ Test all routes
4. ✅ Read QUICKSTART.md
5. ✅ Review docs/ARCHITECTURE.md
6. ✅ Set up Firebase
7. ✅ Deploy to production

## 📞 Support

- Check documentation files
- Review GitHub issues
- Create new issue with details
- Include error messages and steps to reproduce

---

**Version**: 1.0.0
**Status**: ✅ Ready to Run
**Date**: March 2026

🎉 **Happy coding!** 🎉
