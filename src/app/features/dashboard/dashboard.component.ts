import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../core/models/car.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Welcome to Motors</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-600 text-sm font-semibold mb-2">Total Cars</h3>
          <p class="text-3xl font-bold text-secondary">{{ totalCars }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-600 text-sm font-semibold mb-2">New Cars</h3>
          <p class="text-3xl font-bold text-secondary">{{ newCars }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-600 text-sm font-semibold mb-2">Used Cars</h3>
          <p class="text-3xl font-bold text-secondary">{{ usedCars }}</p>
        </div>
      </div>

      <div class="bg-white p-8 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6">Featured Cars</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div *ngFor="let car of cars" class="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <img [src]="car.images[0]" alt="{{ car.brand }}" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="font-bold text-lg">{{ car.brand }} {{ car.model }}</h3>
              <p class="text-gray-600">{{ car.year }} • {{ car.mileage }} km</p>
              <p class="text-secondary font-bold text-xl mt-2">\${{ car.price | number }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .text-secondary { @apply text-red-600; }
    }
  `],
})
export class DashboardComponent implements OnInit {
  cars: Car[] = [];
  totalCars = 0;
  newCars = 0;
  usedCars = 0;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
      this.totalCars = cars.length;
      this.newCars = cars.filter(c => c.condition === 'new').length;
      this.usedCars = cars.filter(c => c.condition === 'used').length;
    });
  }
}
