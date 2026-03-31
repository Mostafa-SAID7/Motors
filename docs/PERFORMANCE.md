# Motors - Performance Guide

## Bundle Size Optimization

### Analyze Bundle

```bash
npm run build -- --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/Motors/stats.json
```

### Reduce Bundle Size

1. **Lazy Loading**
```typescript
const routes: Routes = [
  {
    path: 'cars',
    loadComponent: () => import('./cars/cars.component')
      .then(m => m.CarsComponent),
  },
];
```

2. **Tree Shaking**
```typescript
// ✅ Good - tree-shakeable
import { getCars } from './services/car.service';

// ❌ Bad - not tree-shakeable
import * as CarService from './services/car.service';
```

3. **Remove Unused Code**
```bash
npm install -g depcheck
depcheck
```

## Runtime Performance

### Change Detection

```typescript
// Use OnPush for better performance
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarCardComponent {}
```

### Signals

```typescript
// Signals provide fine-grained reactivity
private cars = signal<Car[]>([]);

// Only affected components re-render
this.cars.set(updatedCars);
```

### Unsubscribe

```typescript
// Use takeUntil to prevent memory leaks
private destroy$ = new Subject<void>();

ngOnInit() {
  this.carService.getCars()
    .pipe(takeUntil(this.destroy$))
    .subscribe(cars => this.cars = cars);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## Image Optimization

### Use Modern Formats

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Car">
</picture>
```

### Lazy Load Images

```html
<img src="car.jpg" loading="lazy" alt="Car">
```

### Responsive Images

```html
<img 
  srcset="car-small.jpg 480w, car-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 1200px"
  src="car.jpg"
  alt="Car">
```

## Network Performance

### HTTP Caching

```typescript
// Cache GET requests
import { HttpClient } from '@angular/common/http';

this.http.get('/api/cars', {
  headers: { 'Cache-Control': 'max-age=3600' }
});
```

### Compression

```typescript
// Enable gzip compression
import { HttpClientModule } from '@angular/common/http';
```

### Minimize Requests

```typescript
// Combine multiple requests
forkJoin([
  this.carService.getCars(),
  this.carService.getStats(),
]).subscribe(([cars, stats]) => {
  // Handle both responses
});
```

## Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse https://motors.com --view
```

### Target Scores

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## Monitoring

### Web Vitals

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Performance API

```typescript
// Measure performance
performance.mark('start');
// ... code to measure
performance.mark('end');
performance.measure('duration', 'start', 'end');

const measure = performance.getEntriesByName('duration')[0];
console.log(measure.duration);
```

## Performance Checklist

- [ ] Bundle size < 500KB
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized
- [ ] Lazy loading enabled
- [ ] Caching configured
- [ ] Compression enabled
- [ ] Monitoring active

## Tools

- Lighthouse
- WebPageTest
- GTmetrix
- New Relic
- DataDog
- Elastic
