import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { CarService } from '../../core/services/car.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <a routerLink="/cars" class="text-blue-600 hover:underline mb-6 inline-block">← Back to Cars</a>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Car Summary -->
        @if (car()) {
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow p-6 sticky top-4">
              <img [src]="car()!.images[0]" alt="Car" class="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 class="text-xl font-bold mb-2">{{ car()!.brand }} {{ car()!.model }}</h3>
              <p class="text-gray-600 mb-4">{{ car()!.year }} • {{ car()!.condition | uppercase }}</p>
              <div class="text-3xl font-bold text-blue-600 mb-6">$ {{ car()!.price | number }}</div>

              <!-- Booking Summary -->
              <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Daily Rate:</span>
                  <span class="font-semibold">$ {{ dailyRate() | number }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Days:</span>
                  <span class="font-semibold">{{ numberOfDays() }}</span>
                </div>
                <div class="border-t pt-2 flex justify-between">
                  <span class="font-bold">Total:</span>
                  <span class="font-bold text-lg text-blue-600">$ {{ totalPrice() | number }}</span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Booking Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow p-8">
            <h2 class="text-3xl font-bold mb-6">Book This Car</h2>

            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Start Date -->
              <div>
                <label class="block text-sm font-semibold mb-2">Start Date</label>
                <input
                  formControlName="startDate"
                  type="date"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                @if (form.get('startDate')?.invalid && form.get('startDate')?.touched) {
                  <p class="text-red-500 text-sm mt-1">Start date is required</p>
                }
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-sm font-semibold mb-2">End Date</label>
                <input
                  formControlName="endDate"
                  type="date"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                @if (form.get('endDate')?.invalid && form.get('endDate')?.touched) {
                  <p class="text-red-500 text-sm mt-1">End date is required</p>
                }
              </div>

              <!-- Driver Info -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold mb-2">First Name</label>
                  <input
                    formControlName="firstName"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold mb-2">Last Name</label>
                  <input
                    formControlName="lastName"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-semibold mb-2">Phone Number</label>
                <input
                  formControlName="phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <!-- Special Requests -->
              <div>
                <label class="block text-sm font-semibold mb-2">Special Requests</label>
                <textarea
                  formControlName="specialRequests"
                  rows="4"
                  placeholder="Any special requests or requirements?"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <!-- Terms -->
              <label class="flex items-start">
                <input type="checkbox" formControlName="terms" class="w-4 h-4 rounded mt-1" />
                <span class="ml-2 text-sm text-gray-600">
                  I agree to the booking terms and conditions
                </span>
              </label>

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="!form.valid || isLoading()"
                class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
              >
                {{ isLoading() ? 'Processing...' : 'Confirm Booking' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class BookingFormComponent implements OnInit {
  form: FormGroup;
  car = signal<any>(null);
  isLoading = signal(false);
  carId: string | null = null;

  dailyRate = signal(0);
  numberOfDays = signal(0);
  totalPrice = signal(0);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private bookingService: BookingService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      specialRequests: [''],
      terms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = params['id'];
      if (this.carId) {
        const car = this.carService.getCarById(this.carId);
        if (car) {
          this.car.set(car);
          this.dailyRate.set(Math.ceil(car.price / 30));
        }
      }
    });

    this.form.get('startDate')?.valueChanges.subscribe(() => this.calculatePrice());
    this.form.get('endDate')?.valueChanges.subscribe(() => this.calculatePrice());
  }

  private calculatePrice(): void {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      if (days > 0) {
        this.numberOfDays.set(days);
        this.totalPrice.set(this.dailyRate() * days);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid && this.carId) {
      this.isLoading.set(true);
      const booking = await this.bookingService.createBooking({
        carId: this.carId,
        userId: 'current-user',
        startDate: new Date(this.form.value.startDate),
        endDate: new Date(this.form.value.endDate),
        status: 'pending',
        totalPrice: this.totalPrice(),
      });

      if (booking) {
        this.notificationService.success('Booking confirmed! Check your email for details.');
        this.router.navigate(['/profile']);
      } else {
        this.notificationService.error('Failed to create booking');
      }
      this.isLoading.set(false);
    }
  }
}
