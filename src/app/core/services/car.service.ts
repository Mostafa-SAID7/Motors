import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private cars = signal<Car[]>([]);
  private carsSubject = new BehaviorSubject<Car[]>([]);

  constructor() {
    this.loadMockData();
  }

  private loadMockData(): void {
    const mockCars: Car[] = [
      {
        id: '1',
        brand: 'BMW',
        model: '3 Series',
        year: 2023,
        price: 45000,
        mileage: 5000,
        condition: 'new',
        color: 'Black',
        images: ['https://via.placeholder.com/400x300?text=BMW+3+Series'],
        description: 'Luxury sedan with advanced features',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        engineSize: '2.0L',
      },
      {
        id: '2',
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2022,
        price: 52000,
        mileage: 15000,
        condition: 'used',
        color: 'Silver',
        images: ['https://via.placeholder.com/400x300?text=Mercedes+C-Class'],
        description: 'Premium sedan with excellent condition',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        engineSize: '2.0L',
      },
      {
        id: '3',
        brand: 'Audi',
        model: 'A4',
        year: 2024,
        price: 48000,
        mileage: 2000,
        condition: 'new',
        color: 'Red',
        images: ['https://via.placeholder.com/400x300?text=Audi+A4'],
        description: 'Latest model with cutting-edge technology',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        engineSize: '2.0L',
      },
    ];

    this.cars.set(mockCars);
    this.carsSubject.next(mockCars);
  }

  getCars(): Observable<Car[]> {
    return this.carsSubject.asObservable();
  }

  getCarsSignal() {
    return this.cars.asReadonly();
  }

  getCarById(id: string): Car | undefined {
    return this.cars().find(car => car.id === id);
  }

  addCar(car: Car): void {
    const newCar = { ...car, id: Date.now().toString() };
    const updated = [...this.cars(), newCar];
    this.cars.set(updated);
    this.carsSubject.next(updated);
  }

  updateCar(id: string, car: Partial<Car>): void {
    const updated = this.cars().map(c => (c.id === id ? { ...c, ...car } : c));
    this.cars.set(updated);
    this.carsSubject.next(updated);
  }

  deleteCar(id: string): void {
    const updated = this.cars().filter(c => c.id !== id);
    this.cars.set(updated);
    this.carsSubject.next(updated);
  }
}
