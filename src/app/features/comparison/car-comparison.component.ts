import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-car-comparison',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <a routerLink="/cars" class="text-blue-600 hover:underline mb-6 inline-block">← Back to Cars</a>

      <h1 class="text-4xl font-bold mb-8">Compare Cars</h1>

      @if (comparisonList().length === 0) {
        <div class="text-center py-12">
          <p class="text-2xl text-gray-600 mb-4">No cars selected for comparison</p>
          <a routerLink="/cars" class="text-blue-600 hover:underline">Browse cars</a>
        </div>
      } @else {
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="border p-4 text-left font-semibold">Feature</th>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <th class="border p-4 text-center">
                      <div class="mb-4">
                        <img [src]="car.images[0]" alt="Car" class="w-full h-32 object-cover rounded mb-2" />
                        <p class="font-bold">{{ car.brand }} {{ car.model }}</p>
                        <p class="text-sm text-gray-600">{{ car.year }}</p>
                      </div>
                      <button
                        (click)="removeFromComparison(carId)"
                        class="text-red-600 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </th>
                  }
                }
              </tr>
            </thead>
            <tbody>
              <!-- Price -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Price</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">$ {{ car.price | number }}</td>
                  }
                }
              </tr>

              <!-- Year -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Year</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.year }}</td>
                  }
                }
              </tr>

              <!-- Condition -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Condition</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.condition | uppercase }}</td>
                  }
                }
              </tr>

              <!-- Mileage -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Mileage</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.mileage | number }} miles</td>
                  }
                }
              </tr>

              <!-- Transmission -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Transmission</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.transmission }}</td>
                  }
                }
              </tr>

              <!-- Fuel Type -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Fuel Type</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.fuelType }}</td>
                  }
                }
              </tr>

              <!-- Engine Size -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Engine Size</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.engineSize }}</td>
                  }
                }
              </tr>

              <!-- Color -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Color</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">{{ car.color }}</td>
                  }
                }
              </tr>

              <!-- Rating -->
              <tr class="border-b hover:bg-gray-50">
                <td class="border p-4 font-semibold">Rating</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">
                      <span class="text-yellow-400">★</span> {{ car.rating }}/5
                    </td>
                  }
                }
              </tr>

              <!-- Action -->
              <tr>
                <td class="border p-4"></td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="border p-4 text-center">
                      <a
                        [routerLink]="['/cars', car.id]"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block"
                      >
                        View Details
                      </a>
                    </td>
                  }
                }
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-8 text-center">
          <button
            (click)="clearComparison()"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Clear Comparison
          </button>
        </div>
      }
    </div>
  `,
})
export class CarComparisonComponent implements OnInit {
  comparisonList = signal<string[]>([]);

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadComparison();
  }

  private loadComparison(): void {
    const comparison = sessionStorage.getItem('carComparison');
    if (comparison) {
      this.comparisonList.set(JSON.parse(comparison));
    }
  }

  getCarById(id: string): any {
    return this.carService.getCarById(id);
  }

  removeFromComparison(carId: string): void {
    this.comparisonList.update(list => list.filter(id => id !== carId));
    this.saveComparison();
  }

  clearComparison(): void {
    this.comparisonList.set([]);
    sessionStorage.removeItem('carComparison');
  }

  private saveComparison(): void {
    sessionStorage.setItem('carComparison', JSON.stringify(this.comparisonList()));
  }
}
