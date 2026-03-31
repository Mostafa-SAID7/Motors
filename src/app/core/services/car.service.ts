import { Injectable, signal, computed, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { DatabaseService } from './database.service';
import { MOCK_CARS } from '../data/cars.data';

export interface FilterOptions {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  fuelType?: string;
  transmission?: string;
}

export interface SortOptions {
  field: 'price' | 'year' | 'mileage' | 'brand';
  direction: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private cars = signal<Car[]>([]);
  private carsSubject = new BehaviorSubject<Car[]>([]);
  private searchTerm = signal<string>('');
  private filters = signal<FilterOptions>({});
  private sortOptions = signal<SortOptions>({ field: 'price', direction: 'asc' });
  private favorites = signal<Set<string>>(new Set());
  private isLoading = signal<boolean>(false);
  private error = signal<string | null>(null);
  private useInsForge = signal<boolean>(false);

  private sdkDb = inject(DatabaseService);

  // Computed signals
  filteredAndSortedCars = computed(() => this.applyFiltersAndSort());
  favoritesList = computed(() => Array.from(this.favorites()));
  isFavoritesEmpty = computed(() => this.favorites().size === 0);

  constructor() {
    this.initializeData();
  }

  private async initializeData(): Promise<void> {
    try {
      const insforgeAvailable = this.checkInsForgeAvailability();
      if (insforgeAvailable) {
        this.useInsForge.set(true);
        await this.loadFromInsForge();
      } else {
        this.loadMockData();
      }
    } catch (error) {
      console.warn('InsForge not available, using mock data:', error);
      this.loadMockData();
    }
  }

  private checkInsForgeAvailability(): boolean {
    try {
      const env = import.meta.env;
      const apiKey = env['VITE_INSFORGE_API_KEY'];
      const baseUrl = env['VITE_INSFORGE_API_BASE_URL'];
      return !!(apiKey && baseUrl);
    } catch {
      return false;
    }
  }

  private async loadFromInsForge(): Promise<void> {
    try {
      this.isLoading.set(true);
      const cars = await this.sdkDb.getCars();
      // If InsForge returns empty (tables not seeded yet), fall back to mock
      if (cars.length === 0) {
        this.loadMockData();
        return;
      }
      this.cars.set(cars);
      this.carsSubject.next(cars);
      this.error.set(null);
    } catch (error) {
      console.error('Failed to load from InsForge:', error);
      this.error.set('Failed to load cars from database');
      this.loadMockData();
    } finally {
      this.isLoading.set(false);
    }
  }

  private loadMockData(): void {
    this.cars.set(MOCK_CARS);
    this.carsSubject.next(MOCK_CARS);
  }

  // ── Search / Filter / Sort ─────────────────────────────────────────────────

  search(term: string): void {
    this.searchTerm.set(term);
  }

  setFilters(filters: FilterOptions): void {
    this.filters.set(filters);
  }

  setSortOptions(options: SortOptions): void {
    this.sortOptions.set(options);
  }

  private applyFiltersAndSort(): Car[] {
    let result = [...this.cars()];
    const search = this.searchTerm().toLowerCase();
    const filterOpts = this.filters();
    const sort = this.sortOptions();

    if (search) {
      result = result.filter(
        (car: Car) =>
          car.brand.toLowerCase().includes(search) ||
          car.model.toLowerCase().includes(search) ||
          car.description.toLowerCase().includes(search)
      );
    }

    if (filterOpts.brand) result = result.filter((car: Car) => car.brand === filterOpts.brand);
    if (filterOpts.minPrice !== undefined) result = result.filter((car: Car) => car.price >= (filterOpts.minPrice ?? 0));
    if (filterOpts.maxPrice !== undefined) result = result.filter((car: Car) => car.price <= (filterOpts.maxPrice ?? Infinity));
    if (filterOpts.condition) result = result.filter((car: Car) => car.condition === filterOpts.condition);
    if (filterOpts.fuelType) result = result.filter((car: Car) => car.fuelType === filterOpts.fuelType);
    if (filterOpts.transmission) result = result.filter((car: Car) => car.transmission === filterOpts.transmission);

    result.sort((a: Car, b: Car) => {
      const aVal = a[sort.field] as string | number;
      const bVal = b[sort.field] as string | number;
      return sort.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return result;
  }

  // ── Favorites ──────────────────────────────────────────────────────────────

  toggleFavorite(carId: string): void {
    const current = new Set(this.favorites());
    if (current.has(carId)) {
      current.delete(carId);
    } else {
      current.add(carId);
    }
    this.favorites.set(current);
  }

  isFavorite(carId: string): boolean {
    return this.favorites().has(carId);
  }

  getFavorites(): Car[] {
    return this.cars().filter(car => this.favorites().has(car.id));
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────

  getCars(): Observable<Car[]> {
    return this.carsSubject.asObservable();
  }

  getCarsSignal() {
    return this.cars.asReadonly();
  }

  getCarById(id: string): Car | undefined {
    return this.cars().find(car => car.id === id);
  }

  async addCar(car: Omit<Car, 'id'>): Promise<string | null> {
    try {
      this.isLoading.set(true);
      let carId: string | null = null;

      if (this.useInsForge()) {
        carId = await this.sdkDb.addCar(car);
        if (carId) await this.loadFromInsForge();
      } else {
        // Mock mode — update local signal only
        carId = Date.now().toString();
        const newCar = { ...car, id: carId } as Car;
        const updated = [...this.cars(), newCar];
        this.cars.set(updated);
        this.carsSubject.next(updated);
      }

      this.error.set(null);
      return carId;
    } catch (error) {
      console.error('Failed to add car:', error);
      this.error.set('Failed to add car');
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateCar(id: string, car: Partial<Car>): Promise<boolean> {
    try {
      this.isLoading.set(true);
      let success = false;

      if (this.useInsForge()) {
        success = await this.sdkDb.updateCar(id, car);
        if (success) await this.loadFromInsForge();
      } else {
        const updated = this.cars().map((c: Car) => (c.id === id ? { ...c, ...car } : c));
        this.cars.set(updated);
        this.carsSubject.next(updated);
        success = true;
      }

      this.error.set(null);
      return success;
    } catch (error) {
      console.error('Failed to update car:', error);
      this.error.set('Failed to update car');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteCar(id: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      let success = false;

      if (this.useInsForge()) {
        success = await this.sdkDb.deleteCar(id);
        if (success) await this.loadFromInsForge();
      } else {
        const updated = this.cars().filter((c: Car) => c.id !== id);
        this.cars.set(updated);
        this.carsSubject.next(updated);
        success = true;
      }

      this.error.set(null);
      return success;
    } catch (error) {
      console.error('Failed to delete car:', error);
      this.error.set('Failed to delete car');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  // ── State ──────────────────────────────────────────────────────────────────

  setLoading(loading: boolean): void { this.isLoading.set(loading); }
  setError(error: string | null): void { this.error.set(error); }
  getError(): string | null { return this.error(); }
  isLoadingSignal() { return this.isLoading.asReadonly(); }
  isUsingInsForge(): boolean { return this.useInsForge(); }

  async refreshCars(): Promise<void> {
    if (this.useInsForge()) {
      await this.loadFromInsForge();
    }
  }
}
