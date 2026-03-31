import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car, CarFilter } from '../../../core/models/car.model';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Our Cars</h1>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <!-- Filters -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="font-bold text-lg mb-4">Filters</h3>
            
            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Brand</label>
              <input [(ngModel)]="filter.brand" type="text" class="w-full border rounded px-3 py-2" placeholder="e.g., BMW">
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Price Range</label>
              <input [(ngModel)]="filter.priceFrom" type="number" class="w-full border rounded px-3 py-2 mb-2" placeholder="From">
              <input [(ngModel)]="filter.priceTo" type="number" class="w-full border rounded px-3 py-2" placeholder="To">
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold mb-2">Condition</label>
              <select [(ngModel)]="filter.condition" class="w-full border rounded px-3 py-2">
                <option value="">All</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <button (click)="applyFilters()" class="w-full bg-secondary text-white py-2 rounded font-semibold hover:bg-red-700 transition">
              Apply Filters
            </button>
          </div>
        </div>

        <!-- Cars Grid -->
        <div class="lg:col-span-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div *ngFor="let car of filteredCars" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition">
              <img [src]="car.images[0]" alt="{{ car.brand }}" class="w-full h-48 object-cover">
              <div class="p-4">
                <h3 class="font-bold text-lg">{{ car.brand }} {{ car.model }}</h3>
                <p class="text-gray-600 text-sm">{{ car.year }} • {{ car.mileage }} km</p>
                <p class="text-gray-600 text-sm">{{ car.condition | uppercase }}</p>
                <p class="text-secondary font-bold text-xl mt-2">\${{ car.price | number }}</p>
                <a [routerLink]="['/cars', car.id]" class="mt-4 block bg-primary text-white text-center py-2 rounded hover:bg-gray-800 transition">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .bg-primary { @apply bg-gray-900; }
      .text-secondary { @apply text-red-600; }
      .bg-secondary { @apply bg-red-600; }
    }
  `],
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  filter: CarFilter = {};

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }

  applyFilters(): void {
    this.filteredCars = this.cars.filter(car => {
      if (this.filter.brand && !car.brand.toLowerCase().includes(this.filter.brand.toLowerCase())) return false;
      if (this.filter.priceFrom && car.price < this.filter.priceFrom) return false;
      if (this.filter.priceTo && car.price > this.filter.priceTo) return false;
      if (this.filter.condition && car.condition !== this.filter.condition) return false;
      return true;
    });
  }
}
