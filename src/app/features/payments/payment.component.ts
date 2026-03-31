import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-12 animate-fadeInUp">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 gradient-text">Payment</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Payment Form -->
          <div class="lg:col-span-2">
            <div class="card p-8 border-glow">
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
                <!-- Card Details -->
                <div class="form-group">
                  <label class="block text-sm font-semibold mb-2 text-slate-300">Card Number</label>
                  <input
                    formControlName="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    class="w-full input"
                  />
                </div>

                <!-- Expiry and CVC -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="form-group">
                    <label class="block text-sm font-semibold mb-2 text-slate-300">Expiry Date</label>
                    <input
                      formControlName="expiry"
                      type="text"
                      placeholder="MM/YY"
                      class="w-full input"
                    />
                  </div>
                  <div class="form-group">
                    <label class="block text-sm font-semibold mb-2 text-slate-300">CVC</label>
                    <input
                      formControlName="cvc"
                      type="text"
                      placeholder="123"
                      class="w-full input"
                    />
                  </div>
                </div>

                <!-- Cardholder Name -->
                <div class="form-group">
                  <label class="block text-sm font-semibold mb-2 text-slate-300">Cardholder Name</label>
                  <input
                    formControlName="cardholderName"
                    type="text"
                    placeholder="John Doe"
                    class="w-full input"
                  />
                </div>

                <!-- Billing Address -->
                <div class="form-group">
                  <label class="block text-sm font-semibold mb-2 text-slate-300">Billing Address</label>
                  <input
                    formControlName="address"
                    type="text"
                    placeholder="123 Main St"
                    class="w-full input"
                  />
                </div>

                <!-- City, State, ZIP -->
                <div class="grid grid-cols-3 gap-4">
                  <input
                    formControlName="city"
                    type="text"
                    placeholder="City"
                    class="input"
                  />
                  <input
                    formControlName="state"
                    type="text"
                    placeholder="State"
                    class="input"
                  />
                  <input
                    formControlName="zip"
                    type="text"
                    placeholder="ZIP"
                    class="input"
                  />
                </div>

                <!-- Submit -->
                <button
                  type="submit"
                  [disabled]="!form.valid || isLoading()"
                  class="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isLoading() ? 'Processing...' : 'Pay Now' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-4 border-glow">
              <h2 class="text-xl font-bold mb-4 text-white">Order Summary</h2>

              <div class="space-y-4 mb-6 text-slate-300">
                <div class="flex justify-between">
                  <span class="text-slate-400">Subtotal</span>
                  <span>$ {{ subtotal() | number }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Tax (10%)</span>
                  <span>$ {{ tax() | number }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Booking Fee</span>
                  <span>$ {{ bookingFee() | number }}</span>
                </div>
                <div class="border-t border-slate-700 pt-4 flex justify-between font-bold text-lg text-white">
                  <span>Total</span>
                  <span class="text-accent">$ {{ total() | number }}</span>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="mb-6">
                <p class="text-sm font-semibold mb-3 text-slate-300">Payment Methods</p>
                <div class="space-y-2 text-slate-400">
                  <label class="flex items-center hover:text-white transition-colors cursor-pointer">
                    <input type="radio" name="method" checked class="w-4 h-4 accent-blue-500" />
                    <span class="ml-2 text-sm">Credit Card</span>
                  </label>
                  <label class="flex items-center hover:text-white transition-colors cursor-pointer">
                    <input type="radio" name="method" class="w-4 h-4 accent-blue-500" />
                    <span class="ml-2 text-sm">PayPal</span>
                  </label>
                  <label class="flex items-center hover:text-white transition-colors cursor-pointer">
                    <input type="radio" name="method" class="w-4 h-4 accent-blue-500" />
                    <span class="ml-2 text-sm">Apple Pay</span>
                  </label>
                </div>
              </div>

              <!-- Security -->
              <div class="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                <p class="text-sm text-green-400 flex items-center gap-2">
                  <span>✓</span> Your payment is secure and encrypted
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
