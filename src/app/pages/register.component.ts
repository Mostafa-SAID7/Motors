import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Motors</h1>
          <p class="text-gray-400">Create your account</p>
        </div>

        <!-- Register Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-gray-800 rounded-lg shadow-2xl p-8 space-y-6">
          <!-- Display Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-200 mb-2">Full Name</label>
            <input
              formControlName="displayName"
              type="text"
              placeholder="John Doe"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            @if (form.get('displayName')?.invalid && form.get('displayName')?.touched) {
              <p class="text-red-400 text-sm mt-1">Name is required</p>
            }
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-semibold text-gray-200 mb-2">Email Address</label>
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

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-200 mb-2">Password</label>
            <input
              formControlName="password"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            @if (form.get('password')?.invalid && form.get('password')?.touched) {
              <p class="text-red-400 text-sm mt-1">Password must be at least 6 characters</p>
            }
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-200 mb-2">Confirm Password</label>
            <input
              formControlName="confirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            @if (form.get('confirmPassword')?.invalid && form.get('confirmPassword')?.touched) {
              <p class="text-red-400 text-sm mt-1">Passwords do not match</p>
            }
          </div>

          <!-- Terms -->
          <label class="flex items-start">
            <input type="checkbox" formControlName="terms" class="w-4 h-4 rounded mt-1" />
            <span class="ml-2 text-sm text-gray-400">
              I agree to the
              <a href="#" class="text-red-500 hover:text-red-400">Terms of Service</a>
              and
              <a href="#" class="text-red-500 hover:text-red-400">Privacy Policy</a>
            </span>
          </label>
          @if (form.get('terms')?.invalid && form.get('terms')?.touched) {
            <p class="text-red-400 text-sm">You must agree to the terms</p>
          }

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="!form.valid || isLoading()"
            class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {{ isLoading() ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <!-- Sign In Link -->
        <p class="text-center text-gray-400 mt-6">
          Already have an account?
          <a routerLink="/login" class="text-red-500 hover:text-red-400 font-semibold transition">
            Sign in
          </a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  form: FormGroup;
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        displayName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.isLoading.set(true);
      const { email, password, displayName } = this.form.value;

      const success = await this.authService.register(email, password, displayName);
      if (success) {
        this.router.navigate(['/login']);
      }
      this.isLoading.set(false);
    }
  }
}
