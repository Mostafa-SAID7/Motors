import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold mb-8">Payment</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Payment Form -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow p-8">
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
                <!-- Card Details -->
                <div>
                  <label class="block text-sm font-semibold mb-2">Card Number</label>
                  <input
                    formControlName="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <!-- Expiry and CVC -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold mb-2">Expiry Date</label>
                    <input
                      formControlName="expiry"
                      type="text"
                      placeholder="MM/YY"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">CVC</label>
                    <input
                      formControlName="cvc"
                      type="text"
                      placeholder="123"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <!-- Cardholder Name -->
                <div>
                  <label class="block text-sm font-semibold mb-2">Cardholder Name</label>
                  <input
                    formControlName="cardholderName"
                    type="text"
                    placeholder="John Doe"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <!-- Billing Address -->
                <div>
                  <label class="block text-sm font-semibold mb-2">Billing Address</label>
                  <input
                    formControlName="address"
                    type="text"
                    placeholder="123 Main St"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <!-- City, State, ZIP -->
                <div class="grid grid-cols-3 gap-4">
                  <input
                    formControlName="city"
                    type="text"
                    placeholder="City"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    formControlName="state"
                    type="text"
                    placeholder="State"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    formControlName="zip"
                    type="text"
                    placeholder="ZIP"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  [disabled]="!form.valid || isLoading()"
                  class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
                >
                  {{ isLoading() ? 'Processing...' : 'Pay Now' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 class="text-xl font-bold mb-4">Order Summary</h2>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span>${{ subtotal() | number }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax (10%)</span>
                  <span>${{ tax() | number }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Booking Fee</span>
                  <span>${{ bookingFee() | number }}</span>
                </div>
                <div class="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span class="text-blue-600">${{ total() | number }}</span>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="mb-6">
                <p class="text-sm font-semibold mb-3">Payment Methods</p>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input type="radio" name="method" checked class="w-4 h-4" />
                    <span class="ml-2 text-sm">Credit Card</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="method" class="w-4 h-4" />
                    <span class="ml-2 text-sm">PayPal</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="method" class="w-4 h-4" />
                    <span class="ml-2 text-sm">Apple Pay</span>
                  </label>
                </div>
              </div>

              <!-- Security -->
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-sm text-green-800">
                  ✓ Your payment is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PaymentComponent {
  form: FormGroup;
  isLoading = signal(false);

  subtotal = signal(500);
  bookingFee = signal(25);

  tax = signal(52.5);
  total = signal(577.5);

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      expiry: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.minLength(3)]],
      cardholderName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.notificationService.success('Payment successful! Your booking is confirmed.');
        this.isLoading.set(false);
      }, 1500);
    }
  }
}
