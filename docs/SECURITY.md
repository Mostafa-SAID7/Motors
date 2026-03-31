# Motors - Security Guide

## Security Best Practices

### 1. Environment Variables

Never commit secrets:

```bash
# .env (add to .gitignore)
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
```

Use environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY'],
  },
};
```

### 2. Authentication

```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
const user = await signInWithEmailAndPassword(auth, email, password);
```

### 3. Authorization

```typescript
// Check user role before allowing action
if (user.role !== 'admin') {
  throw new Error('Unauthorized');
}
```

### 4. Input Validation

```typescript
// Validate user input
if (!email.includes('@')) {
  throw new Error('Invalid email');
}

// Use Reactive Forms validation
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
});
```

### 5. XSS Protection

Angular provides built-in XSS protection:

```typescript
// Safe - Angular sanitizes
<div [innerHTML]="userContent"></div>

// Unsafe - Don't use
<div innerHTML="{{ userContent }}"></div>
```

### 6. CSRF Protection

Use Angular's built-in CSRF token:

```typescript
import { HttpClientXsrfModule } from '@angular/common/http';

HttpClientXsrfModule.withOptions({
  cookieName: 'XSRF-TOKEN',
  headerName: 'X-XSRF-TOKEN',
})
```

### 7. Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cars/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

### 8. Storage Security Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /cars/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

### 9. HTTPS

Always use HTTPS in production:

```typescript
// Redirect HTTP to HTTPS
if (location.protocol !== 'https:') {
  location.protocol = 'https:';
}
```

### 10. Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

## Security Checklist

- [ ] No secrets in code
- [ ] HTTPS enabled
- [ ] Input validation
- [ ] Authentication implemented
- [ ] Authorization checks
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Security headers set
- [ ] Dependencies updated
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Monitoring enabled

## Reporting Security Issues

Please report security vulnerabilities to:
security@motors.com

Do not open public issues for security vulnerabilities.

## Security Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

## Regular Updates

- Update Angular monthly
- Update dependencies weekly
- Review security advisories
- Run security audits
- Test security features
