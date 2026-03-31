import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-car-comparison',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12 animate-fadeInUp">
      <a routerLink="/cars" class="text-accent hover:text-accent-light hover:underline mb-6 inline-block transition-colors">← Back to Cars</a>

      <h1 class="text-4xl font-bold mb-8 gradient-text">Compare Cars</h1>

      @if (comparisonList().length === 0) {
        <div class="text-center py-12 card border-glow">
          <p class="text-2xl text-slate-400 mb-4">No cars selected for comparison</p>
          <a routerLink="/cars" class="btn btn-primary inline-block">Browse cars</a>
        </div>
      } @else {
        <div class="overflow-x-auto card p-0 border-glow">
          <table class="w-full border-collapse text-left text-slate-300">
            <thead class="bg-slate-900 border-b border-slate-700">
              <tr>
                <th class="border-b border-r border-slate-700 p-4 font-semibold text-white">Feature</th>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <th class="border-b border-slate-700 p-4 text-center">
                      <div class="mb-4">
                        <img [src]="car.images[0]" alt="Car" class="w-full h-32 object-cover rounded mb-2 shadow-glow" />
                        <p class="font-bold text-white">{{ car.brand }} {{ car.model }}</p>
                        <p class="text-sm text-slate-400">{{ car.year }}</p>
                      </div>
                      <button
                        (click)="removeFromComparison(carId)"
                        class="text-error hover:text-red-400 hover:underline text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </th>
                  }
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700 leading-relaxed">
              <!-- Price -->
              <tr class="hover:bg-slate-800/50 transition-colors">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Price</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center text-accent font-bold">$ {{ car.price | number }}</td>
                  }
                }
              </tr>

              <!-- Year -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Year</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">{{ car.year }}</td>
                  }
                }
              </tr>

              <!-- Condition -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Condition</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center"><span class="px-2 py-1 rounded text-xs font-bold bg-slate-800 border border-slate-600">{{ car.condition | uppercase }}</span></td>
                  }
                }
              </tr>

              <!-- Mileage -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Mileage</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">{{ car.mileage | number }} miles</td>
                  }
                }
              </tr>

              <!-- Transmission -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Transmission</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">{{ car.transmission }}</td>
                  }
                }
              </tr>

              <!-- Fuel Type -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Fuel Type</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">{{ car.fuelType }}</td>
                  }
                }
              </tr>

              <!-- Engine Size -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Engine Size</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">{{ car.engineSize }}</td>
                  }
                }
              </tr>

              <!-- Color -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Color</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">{{ car.color }}</td>
                  }
                }
              </tr>

              <!-- Rating -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4 font-semibold text-white">Rating</td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center font-bold text-white">
                      <span class="text-warning">★</span> {{ car.rating }}/5
                    </td>
                  }
                }
              </tr>

              <!-- Action -->
              <tr class="hover:bg-slate-800/50 transition-colors border-t border-slate-700">
                <td class="border-r border-slate-700 p-4"></td>
                @for (carId of comparisonList(); track carId) {
                  @let car = getCarById(carId);
                  @if (car) {
                    <td class="p-4 text-center">
                      <a
                        [routerLink]="['/cars', car.id]"
                        class="btn btn-secondary text-sm inline-block"
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

        <div class="mt-8 text-center animate-fadeInUp">
          <button
            (click)="clearComparison()"
            class="btn btn-secondary border border-error text-error hover:bg-error hover:text-white transition-colors"
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
