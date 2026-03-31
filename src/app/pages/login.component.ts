import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- Logo/Header -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Motors</h1>
          <p class="text-gray-400">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-gray-800 rounded-lg shadow-2xl p-8 space-y-6">
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
              <p class="text-red-400 text-sm mt-1">Password is required</p>
            }
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="w-4 h-4 rounded" />
              <span class="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <a routerLink="/forgot-password" class="text-sm text-red-500 hover:text-red-400 transition">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="!form.valid || isLoading()"
            class="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {{ isLoading() ? 'Signing in...' : 'Sign In' }}
          </button>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          <!-- Social Login -->
          <div class="grid grid-cols-2 gap-4">
            <button type="button" class="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition">
              Google
            </button>
            <button type="button" class="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition">
              GitHub
            </button>
          </div>
        </form>

        <!-- Sign Up Link -->
        <p class="text-center text-gray-400 mt-6">
          Don't have an account?
          <a routerLink="/register" class="text-red-500 hover:text-red-400 font-semibold transition">
            Sign up
          </a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  form: FormGroup;
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.isLoading.set(true);
      const { email, password } = this.form.value;

      const success = await this.authService.login(email, password);
      if (success) {
        this.router.navigate(['/dashboard']);
      }
      this.isLoading.set(false);
    }
  }
}
