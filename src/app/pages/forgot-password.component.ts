import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Motors</h1>
          <p class="text-gray-400">Reset your password</p>
        </div>

        <!-- Reset Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-gray-800 rounded-lg shadow-2xl p-8 space-y-6">
          @if (!submitted()) {
            <!-- Email Input -->
            <div>
              <label class="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
              <p class="text-gray-400 text-sm mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <input
                formControlName="email"
                type="email"
                placeholder="you@example.com"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
              @if (form.get('email')?.invalid && form.get('email')?.touched) {
                <p class="text-red-400 text-sm mt-1">Please enter a valid email</p>
              }
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="!form.valid || isLoading()"
              class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {{ isLoading() ? 'Sending...' : 'Send Reset Link' }}
            </button>
          } @else {
            <!-- Success Message -->
            <div class="bg-green-900 border border-green-700 rounded-lg p-4">
              <p class="text-green-200">
                ✓ Password reset link has been sent to your email. Check your inbox and follow the instructions.
              </p>
            </div>

            <button
              type="button"
              (click)="resetForm()"
              class="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Send Another Link
            </button>
          }

          <!-- Back to Login -->
          <div class="text-center">
            <a routerLink="/login" class="text-red-500 hover:text-red-400 text-sm transition">
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ForgotPasswordComponent {
  form: FormGroup;
  isLoading = signal(false);
  submitted = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.isLoading.set(true);
      const { email } = this.form.value;

      const success = await this.authService.resetPassword(email);
      if (success) {
        this.submitted.set(true);
      }
      this.isLoading.set(false);
    }
  }

  resetForm(): void {
    this.form.reset();
    this.submitted.set(false);
  }
}
