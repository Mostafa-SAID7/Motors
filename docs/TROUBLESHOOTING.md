# Motors - Troubleshooting Guide

## Common Issues

### Port 4200 Already in Use

**Problem**: `Port 4200 is already in use`

**Solution**:
```bash
# Use different port
ng serve --port 4300

# Or kill process using port 4200
# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :4200
kill -9 <PID>
```

### Dependencies Conflict

**Problem**: `npm ERR! ERESOLVE unable to resolve dependency tree`

**Solution**:
```bash
npm install --legacy-peer-deps
```

### Module Not Found

**Problem**: `Cannot find module '@angular/...'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Build Fails

**Problem**: `ng build` fails with errors

**Solution**:
```bash
# Clear cache
ng cache clean

# Rebuild
ng build

# Or with verbose output
ng build --verbose
```

### Tests Failing

**Problem**: Unit tests fail

**Solution**:
```bash
# Run tests with watch mode
ng test

# Run specific test file
ng test --include='**/car.service.spec.ts'

# Run with coverage
ng test --code-coverage
```

### Hot Module Replacement Not Working

**Problem**: Changes not reflecting in browser

**Solution**:
```bash
# Restart dev server
ng serve --poll=2000

# Or disable HMR
ng serve --hmr=false
```

### TypeScript Errors

**Problem**: TypeScript compilation errors

**Solution**:
```bash
# Check TypeScript version
tsc --version

# Update TypeScript
npm install --save-dev typescript@latest

# Rebuild
ng build
```

### Tailwind CSS Not Working

**Problem**: Tailwind classes not applied

**Solution**:
1. Check `tailwind.config.js` content paths
2. Verify `@tailwind` directives in `styles.css`
3. Rebuild: `ng serve`

### Firebase Connection Issues

**Problem**: Cannot connect to Firebase

**Solution**:
1. Check Firebase config in `environment.ts`
2. Verify Firebase project exists
3. Check internet connection
4. Review Firebase security rules

### CORS Errors

**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Configure CORS on backend
2. Use proxy for development:
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "pathRewrite": { "^/api": "" }
  }
}
```

### Memory Leaks

**Problem**: Application slows down over time

**Solution**:
```typescript
// Unsubscribe from observables
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Performance Issues

**Problem**: Application is slow

**Solution**:
1. Check bundle size: `npm run build -- --stats-json`
2. Enable OnPush change detection
3. Use lazy loading
4. Optimize images
5. Run Lighthouse audit

## Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. Go to Sources tab
3. Set breakpoints
4. Step through code

### Angular DevTools

1. Install Angular DevTools extension
2. Open DevTools
3. Go to Angular tab
4. Inspect components and services

### Console Logging

```typescript
console.log('Debug:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
console.table(data);
```

### Network Debugging

1. Open DevTools
2. Go to Network tab
3. Check requests/responses
4. Look for failed requests

## Performance Profiling

### Chrome DevTools

1. Open DevTools
2. Go to Performance tab
3. Click Record
4. Perform actions
5. Click Stop
6. Analyze results

### Lighthouse

```bash
npm install -g lighthouse
lighthouse https://motors.com --view
```

## Getting Help

1. Check this troubleshooting guide
2. Review documentation
3. Search GitHub issues
4. Check Stack Overflow
5. Ask in discussions
6. Create new issue

## Reporting Issues

When reporting issues, include:
- Error message
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, browser, versions)
- Screenshots/logs

## Resources

- [Angular Docs](https://angular.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/angular)
- [GitHub Issues](https://github.com/yourusername/Motors/issues)
