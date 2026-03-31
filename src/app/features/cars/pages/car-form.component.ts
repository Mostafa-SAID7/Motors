import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../../../core/services/car.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">{{ isEdit() ? 'Edit Car' : 'Add New Car' }}</h1>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="max-w-2xl bg-white p-8 rounded-lg shadow space-y-6">
        <!-- Brand and Model -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Brand *</label>
            <input
              formControlName="brand"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('brand')?.invalid && form.get('brand')?.touched) {
              <p class="text-red-500 text-sm mt-1">Brand is required</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Model *</label>
            <input
              formControlName="model"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('model')?.invalid && form.get('model')?.touched) {
              <p class="text-red-500 text-sm mt-1">Model is required</p>
            }
          </div>
        </div>

        <!-- Year and Price -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Year *</label>
            <input
              formControlName="year"
              type="number"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('year')?.invalid && form.get('year')?.touched) {
              <p class="text-red-500 text-sm mt-1">Year is required</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Price ($) *</label>
            <input
              formControlName="price"
              type="number"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('price')?.invalid && form.get('price')?.touched) {
              <p class="text-red-500 text-sm mt-1">Price is required</p>
            }
          </div>
        </div>

        <!-- Mileage and Condition -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Mileage (miles) *</label>
            <input
              formControlName="mileage"
              type="number"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('mileage')?.invalid && form.get('mileage')?.touched) {
              <p class="text-red-500 text-sm mt-1">Mileage is required</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Condition *</label>
            <select
              formControlName="condition"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            @if (form.get('condition')?.invalid && form.get('condition')?.touched) {
              <p class="text-red-500 text-sm mt-1">Condition is required</p>
            }
          </div>
        </div>

        <!-- Color and Transmission -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Color *</label>
            <input
              formControlName="color"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('color')?.invalid && form.get('color')?.touched) {
              <p class="text-red-500 text-sm mt-1">Color is required</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Transmission *</label>
            <select
              formControlName="transmission"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            @if (form.get('transmission')?.invalid && form.get('transmission')?.touched) {
              <p class="text-red-500 text-sm mt-1">Transmission is required</p>
            }
          </div>
        </div>

        <!-- Fuel Type and Engine Size -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold mb-2">Fuel Type *</label>
            <select
              formControlName="fuelType"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            @if (form.get('fuelType')?.invalid && form.get('fuelType')?.touched) {
              <p class="text-red-500 text-sm mt-1">Fuel Type is required</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Engine Size *</label>
            <input
              formControlName="engineSize"
              type="text"
              placeholder="e.g., 2.0L"
              class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            @if (form.get('engineSize')?.invalid && form.get('engineSize')?.touched) {
              <p class="text-red-500 text-sm mt-1">Engine Size is required</p>
            }
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold mb-2">Description *</label>
          <textarea
            formControlName="description"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
            required
          ></textarea>
          @if (form.get('description')?.invalid && form.get('description')?.touched) {
            <p class="text-red-500 text-sm mt-1">Description is required</p>
          }
        </div>

        <!-- Images -->
        <div>
          <label class="block text-sm font-semibold mb-2">Images (comma-separated URLs) *</label>
          <textarea
            formControlName="images"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            required
          ></textarea>
          @if (form.get('images')?.invalid && form.get('images')?.touched) {
            <p class="text-red-500 text-sm mt-1">At least one image URL is required</p>
          }
          <p class="text-gray-600 text-sm mt-1">Separate multiple URLs with commas</p>
        </div>

        <!-- Form Actions -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            [disabled]="!form.valid || isSubmitting()"
            class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting() ? 'Saving...' : isEdit() ? 'Update Car' : 'Add Car' }}
          </button>
          <button
            type="button"
            (click)="resetForm()"
            class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Reset
          </button>
          <a
            routerLink="/cars"
            class="flex-1 text-center border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        .bg-secondary {
          @apply bg-red-600;
        }
      }
    `,
  ],
})
export class CarFormComponent implements OnInit {
  form: FormGroup;
  isEdit = signal(false);
  isSubmitting = signal(false);
  carId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
      price: ['', [Validators.required, Validators.min(0)]],
      mileage: ['', [Validators.required, Validators.min(0)]],
      condition: ['new', Validators.required],
      color: ['', Validators.required],
      transmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      engineSize: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      images: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit.set(true);
        this.carId = params['id'];
        if (this.carId) {
          const car = this.carService.getCarById(this.carId);
          if (car) {
            this.form.patchValue({
              ...car,
              images: car.images.join(', '),
            });
          } else {
            this.notificationService.error('Car not found');
            this.router.navigate(['/cars']);
          }
        }
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      const formValue = this.form.value;
      const carData = {
        ...formValue,
        images: formValue.images
          .split(',')
          .map((img: string) => img.trim())
          .filter((img: string) => img.length > 0),
      };

      try {
        if (this.isEdit() && this.carId) {
          const success = await this.carService.updateCar(this.carId, carData);
          if (success) {
            this.notificationService.success('Car updated successfully!');
            this.router.navigate(['/cars']);
          } else {
            this.notificationService.error('Failed to update car');
          }
        } else {
          const carId = await this.carService.addCar(carData);
          if (carId) {
            this.notificationService.success('Car added successfully!');
            this.router.navigate(['/cars']);
          } else {
            this.notificationService.error('Failed to add car');
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        this.notificationService.error('An error occurred. Please try again.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.notificationService.warning('Please fill in all required fields');
    }
  }

  resetForm(): void {
    this.form.reset({ condition: 'new' });
    this.notificationService.info('Form reset');
  }
}
