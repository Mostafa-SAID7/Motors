# Motors - Deployment Guide

## Build for Production

```bash
npm run build
```

Output: `dist/Motors/`

## Deployment Options

### 1. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### 2. Vercel

```bash
npm install -g vercel
vercel
```

### 3. Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist/Motors
```

### 4. Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]
```

## Environment Variables

### Development
```
NG_APP_API_URL=http://localhost:3000
NG_APP_ENV=development
```

### Production
```
NG_APP_API_URL=https://api.motors.com
NG_APP_ENV=production
```

## Performance Optimization

### Bundle Analysis
```bash
npm run build -- --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/Motors/stats.json
```

### Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse https://motors.com
```

## Security Checklist

- [ ] Environment variables secured
- [ ] API keys not exposed
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Security headers set
- [ ] Dependencies updated
- [ ] Code reviewed
- [ ] Tests passing

## Monitoring

### Error Tracking
- Sentry
- Rollbar
- LogRocket

### Analytics
- Google Analytics
- Mixpanel
- Amplitude

### Performance
- New Relic
- DataDog
- Elastic

## CI/CD Pipeline

See `.github/workflows/` for automated deployment
