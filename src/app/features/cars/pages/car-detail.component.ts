import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12" *ngIf="car">
      <a routerLink="/cars" class="text-secondary hover:underline mb-6 inline-block">← Back to Cars</a>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Images -->
        <div>
          <img [src]="car.images[0]" alt="{{ car.brand }}" class="w-full rounded-lg shadow-lg mb-4">
          <div class="grid grid-cols-4 gap-2">
            <img *ngFor="let img of car.images" [src]="img" alt="thumbnail" class="w-full rounded cursor-pointer hover:opacity-75">
          </div>
        </div>

        <!-- Details -->
        <div>
          <h1 class="text-4xl font-bold mb-2">{{ car.brand }} {{ car.model }}</h1>
          <p class="text-gray-600 mb-4">{{ car.year }} • {{ car.condition | uppercase }}</p>
          
          <p class="text-4xl font-bold text-secondary mb-6">\${{ car.price | number }}</p>

          <div class="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 class="font-bold text-lg mb-4">Specifications</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-gray-600 text-sm">Mileage</p>
                <p class="font-semibold">{{ car.mileage }} km</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Transmission</p>
                <p class="font-semibold">{{ car.transmission }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Fuel Type</p>
                <p class="font-semibold">{{ car.fuelType }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Engine Size</p>
                <p class="font-semibold">{{ car.engineSize }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">Color</p>
                <p class="font-semibold">{{ car.color }}</p>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2">Description</h3>
            <p class="text-gray-700">{{ car.description }}</p>
          </div>

          <div class="flex gap-4">
            <button class="flex-1 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Book Now
            </button>
            <button class="flex-1 border-2 border-secondary text-secondary py-3 rounded-lg font-semibold hover:bg-red-50 transition">
              Contact Seller
            </button>
          </div>

          <a [routerLink]="['/cars', car.id, 'edit']" class="mt-4 block text-center bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition">
            Edit Car
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .text-secondary { @apply text-red-600; }
      .bg-secondary { @apply bg-red-600; }
      .border-secondary { @apply border-red-600; }
    }
  `],
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.car = this.carService.getCarById(id);
    });
  }
}
