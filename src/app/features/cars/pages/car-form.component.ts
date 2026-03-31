import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">{{ isEdit ? 'Edit Car' : 'Add New Car' }}</h1>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="max-w-2xl bg-white p-8 rounded-lg shadow">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Brand</label>
            <input formControlName="brand" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Model</label>
            <input formControlName="model" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Year</label>
            <input formControlName="year" type="number" class="w-full border rounded px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Price</label>
            <input formControlName="price" type="number" class="w-full border rounded px-3 py-2" required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Mileage (km)</label>
            <input formControlName="mileage" type="number" class="w-full border rounded px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Condition</label>
            <select formControlName="condition" class="w-full border rounded px-3 py-2" required>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Color</label>
            <input formControlName="color" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Transmission</label>
            <input formControlName="transmission" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Fuel Type</label>
            <input formControlName="fuelType" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Engine Size</label>
            <input formControlName="engineSize" type="text" class="w-full border rounded px-3 py-2" required>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold mb-2">Description</label>
          <textarea formControlName="description" class="w-full border rounded px-3 py-2 h-24" required></textarea>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-semibold mb-2">Images (comma-separated URLs)</label>
          <textarea formControlName="images" class="w-full border rounded px-3 py-2 h-20" required></textarea>
        </div>

        <div class="flex gap-4">
          <button type="submit" [disabled]="!form.valid" class="flex-1 bg-secondary text-white py-2 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50">
            {{ isEdit ? 'Update Car' : 'Add Car' }}
          </button>
          <a routerLink="/cars" class="flex-1 text-center border-2 border-gray-300 py-2 rounded font-semibold hover:bg-gray-50 transition">
            Cancel
          </a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .bg-secondary { @apply bg-red-600; }
    }
  `],
})
export class CarFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  carId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      price: ['', Validators.required],
      mileage: ['', Validators.required],
      condition: ['new', Validators.required],
      color: ['', Validators.required],
      transmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      engineSize: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.carId = params['id'];
        const car = this.carService.getCarById(this.carId);
        if (car) {
          this.form.patchValue({
            ...car,
            images: car.images.join(', '),
          });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const car: Car = {
        ...formValue,
        id: this.carId || '',
        images: formValue.images.split(',').map((img: string) => img.trim()),
      };

      if (this.isEdit && this.carId) {
        this.carService.updateCar(this.carId, car);
      } else {
        this.carService.addCar(car);
      }

      this.router.navigate(['/cars']);
    }
  }
}
