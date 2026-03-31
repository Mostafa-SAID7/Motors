# Motors - Testing Guide

## Unit Testing

### Setup

```bash
npm install --save-dev @angular/core/testing jasmine karma
```

### Example Test

```typescript
import { TestBed } from '@angular/core/testing';
import { CarService } from './car.service';

describe('CarService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cars', (done) => {
    service.getCars().subscribe(cars => {
      expect(cars.length).toBeGreaterThan(0);
      done();
    });
  });
});
```

### Run Tests

```bash
ng test
ng test --watch=false
ng test --code-coverage
```

## Component Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cars', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')).toBeTruthy();
  });
});
```

## E2E Testing

### Setup

```bash
npm install --save-dev @angular/e2e cypress
```

### Example Test

```typescript
describe('Cars Page', () => {
  beforeEach(() => {
    cy.visit('/cars');
  });

  it('should display cars list', () => {
    cy.get('[data-testid="car-card"]').should('have.length.greaterThan', 0);
  });

  it('should filter cars', () => {
    cy.get('[data-testid="brand-filter"]').type('BMW');
    cy.get('[data-testid="apply-filters"]').click();
    cy.get('[data-testid="car-card"]').should('contain', 'BMW');
  });
});
```

### Run E2E Tests

```bash
ng e2e
npx cypress open
```

## Coverage Goals

- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

## Testing Best Practices

1. Test behavior, not implementation
2. Use descriptive test names
3. Keep tests isolated
4. Mock external dependencies
5. Test edge cases
6. Maintain test data
7. Use page objects for E2E
8. Run tests in CI/CD

## Debugging Tests

```bash
ng test --browsers=Chrome --watch=true
```

Then open Chrome DevTools to debug.
