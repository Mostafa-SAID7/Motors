# Motors - Component Hierarchy & Data Flow

## 🏗️ Component Tree

```
App (Root)
│
└── LayoutComponent
    ├── HeaderComponent
    │   └── Navigation Links
    │       ├── Home
    │       ├── Cars
    │       └── Add Car
    │
    ├── Main Content (Router Outlet)
    │   ├── DashboardComponent
    │   │   ├── Statistics Cards (3)
    │   │   └── Featured Cars Grid (3)
    │   │
    │   ├── CarsListComponent
    │   │   ├── FilterPanel
    │   │   │   ├── Brand Input
    │   │   │   ├── Price Range
    │   │   │   ├── Condition Select
    │   │   │   └── Apply Button
    │   │   │
    │   │   └── CarsGrid
    │   │       └── CarCard (Multiple)
    │   │           ├── Image
    │   │           ├── Title
    │   │           ├── Details
    │   │           ├── Price
    │   │           └── View Details Link
    │   │
    │   ├── CarDetailComponent
    │   │   ├── Back Link
    │   │   ├── ImageGallery
    │   │   │   ├── Main Image
    │   │   │   └── Thumbnails
    │   │   ├── Details Section
    │   │   │   ├── Title
    │   │   │   ├── Year & Condition
    │   │   │   ├── Price
    │   │   │   └── Specifications Grid
    │   │   ├── Description
    │   │   ├── Action Buttons
    │   │   │   ├── Book Now
    │   │   │   ├── Contact Seller
    │   │   │   └── Edit Car
    │   │   └── Edit Link
    │   │
    │   ├── CarFormComponent
    │   │   ├── Form Title
    │   │   ├── Form Fields
    │   │   │   ├── Brand Input
    │   │   │   ├── Model Input
    │   │   │   ├── Year Input
    │   │   │   ├── Price Input
    │   │   │   ├── Mileage Input
    │   │   │   ├── Condition Select
    │   │   │   ├── Color Input
    │   │   │   ├── Transmission Input
    │   │   │   ├── Fuel Type Input
    │   │   │   ├── Engine Size Input
    │   │   │   ├── Description Textarea
    │   │   │   └── Images Textarea
    │   │   └── Form Actions
    │   │       ├── Submit Button
    │   │       └── Cancel Link
    │   │
    │   └── NotFoundComponent
    │       ├── 404 Message
    │       └── Home Link
    │
    └── FooterComponent
        ├── About Section
        ├── Quick Links
        ├── Contact Info
        └── Copyright
```

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CarService                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Signal: cars = signal<Car[]>([])                   │  │
│  │  Subject: carsSubject = new BehaviorSubject<Car[]>  │  │
│  │                                                      │  │
│  │  Methods:                                            │  │
│  │  - getCars(): Observable<Car[]>                     │  │
│  │  - getCarsSignal(): ReadonlySignal<Car[]>           │  │
│  │  - getCarById(id): Car | undefined                  │  │
│  │  - addCar(car): void                                │  │
│  │  - updateCar(id, car): void                         │  │
│  │  - deleteCar(id): void                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
   DashboardComponent  CarsListComponent  CarDetailComponent
        │                   │                   │
        ├─ Subscribe        ├─ Subscribe        ├─ Get by ID
        │  to getCars()     │  to getCars()     │  from service
        │                   │                   │
        ├─ Calculate        ├─ Filter cars      ├─ Display
        │  statistics       │  based on         │  car details
        │                   │  filters          │
        └─ Display          └─ Display          └─ Show actions
           stats               filtered list       (Book, Edit)
                                                       ↓
                                            CarFormComponent
                                                   │
                                                   ├─ Load car
                                                   │  if editing
                                                   │
                                                   ├─ Build form
                                                   │  with values
                                                   │
                                                   ├─ Validate
                                                   │  on submit
                                                   │
                                                   └─ Call service
                                                      (add/update)
```

## 🔄 State Management Flow

### Using Signals

```typescript
// 1. Define Signal in Service
private cars = signal<Car[]>([]);

// 2. Expose as Read-only
getCarsSignal() {
  return this.cars.asReadonly();
}

// 3. Update Signal
updateCar(id: string, car: Partial<Car>): void {
  const updated = this.cars().map(c => 
    c.id === id ? { ...c, ...car } : c
  );
  this.cars.set(updated);  // ← Triggers reactivity
}

// 4. Component Subscribes
cars = this.carService.getCarsSignal();

// 5. Template Uses Signal
{{ cars().length }}  // ← Automatic updates
```

### Using Observables (Alternative)

```typescript
// 1. Define Subject in Service
private carsSubject = new BehaviorSubject<Car[]>([]);

// 2. Expose as Observable
getCars(): Observable<Car[]> {
  return this.carsSubject.asObservable();
}

// 3. Update Subject
this.carsSubject.next(updatedCars);

// 4. Component Subscribes
this.carService.getCars().subscribe(cars => {
  this.cars = cars;
});

// 5. Template Uses Property
{{ cars.length }}
```

## 📱 Component Communication

### Parent → Child
```typescript
// Parent Component
<app-car-card [car]="car" [index]="i"></app-car-card>

// Child Component
@Input() car: Car;
@Input() index: number;
```

### Child → Parent
```typescript
// Child Component
@Output() carSelected = new EventEmitter<Car>();

onSelectCar() {
  this.carSelected.emit(this.car);
}

// Parent Component
<app-car-card (carSelected)="onCarSelected($event)"></app-car-card>

onCarSelected(car: Car) {
  // Handle selection
}
```

### Via Service
```typescript
// Service
private selectedCar = signal<Car | null>(null);

setSelectedCar(car: Car) {
  this.selectedCar.set(car);
}

getSelectedCar() {
  return this.selectedCar.asReadonly();
}

// Component 1
this.carService.setSelectedCar(car);

// Component 2
selectedCar = this.carService.getSelectedCar();
```

## 🔀 Routing Flow

```
User navigates to /cars
        ↓
app.routes.ts matches route
        ↓
Lazy loads CarsListComponent
        ↓
Component initializes
        ↓
Subscribes to CarService.getCars()
        ↓
Service returns mock data
        ↓
Component displays cars
        ↓
User clicks "View Details"
        ↓
Router navigates to /cars/:id
        ↓
Lazy loads CarDetailComponent
        ↓
Component reads route params
        ↓
Gets car by ID from service
        ↓
Displays car details
```

## 📋 Form Flow

```
User navigates to /cars/add
        ↓
CarFormComponent initializes
        ↓
FormBuilder creates form group
        ↓
Form displays with empty fields
        ↓
User fills form
        ↓
User clicks "Add Car"
        ↓
Form validates
        ↓
If valid:
  ├─ Extract form values
  ├─ Create Car object
  ├─ Call CarService.addCar()
  ├─ Service updates signal
  ├─ All subscribers notified
  └─ Navigate to /cars
        ↓
If invalid:
  └─ Show validation errors
```

## 🎯 Filter Flow

```
User opens /cars
        ↓
CarsListComponent loads
        ↓
Subscribes to all cars
        ↓
Displays all cars
        ↓
User enters filter values
        ↓
User clicks "Apply Filters"
        ↓
applyFilters() method called
        ↓
Filters cars array locally
        ↓
Updates filteredCars property
        ↓
Template re-renders with filtered results
```

## 🔐 Service Singleton Pattern

```
┌─────────────────────────────────────┐
│  CarService (Singleton)             │
│  providedIn: 'root'                 │
└─────────────────────────────────────┘
         ↑
         │ (Single instance)
         │
    ┌────┴────┬────────┬────────┐
    ↓         ↓        ↓        ↓
Dashboard  CarsList  CarDetail CarForm
Component  Component Component Component
```

## 📦 Module Dependencies

```
App
├── CommonModule (Angular)
├── RouterOutlet (Angular)
├── FormsModule (Angular)
├── ReactiveFormsModule (Angular)
├── HttpClientModule (Angular)
├── BrowserAnimationsModule (Angular)
├── TranslateModule (ngx-translate)
├── PrimeNG Components (Ready to add)
└── Custom Components
    ├── LayoutComponent
    ├── HeaderComponent
    ├── FooterComponent
    ├── DashboardComponent
    ├── CarsListComponent
    ├── CarDetailComponent
    ├── CarFormComponent
    └── NotFoundComponent
```

## 🔄 Lifecycle Hooks Used

### DashboardComponent
```typescript
ngOnInit() {
  // Subscribe to cars
  // Calculate statistics
}
```

### CarsListComponent
```typescript
ngOnInit() {
  // Subscribe to cars
  // Initialize filters
}
```

### CarDetailComponent
```typescript
ngOnInit() {
  // Get route params
  // Fetch car by ID
}
```

### CarFormComponent
```typescript
ngOnInit() {
  // Check if editing
  // Load car data if editing
  // Initialize form
}
```

## 🎨 Change Detection Strategy

Current: Default (OnPush ready)

To optimize:
```typescript
@Component({
  selector: 'app-car-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

## 📊 Data Models

```typescript
Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  condition: 'new' | 'used'
  color: string
  images: string[]
  description: string
  transmission: string
  fuelType: string
  engineSize: string
}

CarFilter {
  brand?: string
  model?: string
  yearFrom?: number
  yearTo?: number
  priceFrom?: number
  priceTo?: number
  condition?: 'new' | 'used'
  color?: string
  search?: string
}
```

## 🚀 Performance Considerations

1. **Lazy Loading**: Routes are lazy-loaded
2. **Signals**: Fine-grained reactivity
3. **OnPush**: Ready to implement
4. **Unsubscribe**: Use async pipe or takeUntil
5. **Change Detection**: Optimized for Signals
6. **Bundle Size**: Minimal dependencies

---

**Last Updated**: March 2026
**Version**: 1.0.0
