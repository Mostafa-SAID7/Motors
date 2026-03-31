# Motors - Architecture Guide

## System Architecture

### Layered Architecture

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  (Components, Templates, Styles)    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Business Logic Layer           │
│  (Services, State Management)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Data Access Layer              │
│  (Firebase, HTTP, Local Storage)    │
└─────────────────────────────────────┘
```

## Component Architecture

### Feature-Sliced Design

Each feature is self-contained with:
- Pages (route components)
- Components (UI components)
- Services (business logic)
- Models (data structures)
- Store (state management)

### Dependency Injection

Services are provided at root level:
```typescript
@Injectable({ providedIn: 'root' })
export class CarService { }
```

## State Management

### Using Angular Signals

```typescript
private cars = signal<Car[]>([]);

getCarsSignal() {
  return this.cars.asReadonly();
}

updateCars(cars: Car[]) {
  this.cars.set(cars);
}
```

## Data Flow

1. Component requests data
2. Service fetches from Firebase/API
3. Service updates Signal
4. Component receives update
5. Template re-renders

## Routing Strategy

- Lazy loading for features
- Nested routes for sub-pages
- Route guards for protection
- Redirect for invalid routes

## Performance Optimization

- OnPush change detection
- Lazy loading routes
- Image optimization
- Bundle size optimization
- Tree-shaking enabled
