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
    <div class="focused-page-container dark font-body overflow-hidden">
      <!-- Cinematic Decorative Elements -->
      <div class="decor-connectors"></div>
      
      <!-- Top Left Node -->
      <div class="decor-node top-10 left-10"></div>
      <div class="decor-line h-px w-32 top-11 left-10 origin-left rotate-12 opacity-20"></div>
      
      <!-- Bottom Right Node -->
      <div class="decor-node bottom-20 right-20"></div>
      <div class="decor-line h-px w-48 bottom-21 right-20 origin-right -rotate-45 opacity-15"></div>

      <div class="auth-card-wrapper">
        <!-- Logo/Header -->
        <div class="text-center mb-10">
          <h1 class="text-5xl font-black font-display text-gradient mb-3">Motors</h1>
          <p class="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">إعادة تعيين كلمة المرور</p>
        </div>

        <!-- Reset Form -->
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="card border-glow shadow-glow-lg p-10 space-y-8 backdrop-blur-2xl bg-card/80">
          @if (!submitted()) {
            <!-- Email Input -->
            <div class="space-y-3">
              <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">البريد الإلكتروني</label>
              <p class="text-muted-foreground text-xs leading-relaxed mb-4">
                أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور الخاصة بك.
              </p>
              <input
                formControlName="email"
                type="email"
                placeholder="you@example.com"
                class="w-full input pr-4"
              />
              @if (form.get('email')?.invalid && form.get('email')?.touched) {
                <p class="text-primary text-[10px] font-black mt-2 mr-1">يرجى إدخال بريد إلكتروني صحيح</p>
              }
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="!form.valid || isLoading()"
              class="w-full btn btn-primary py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-glow disabled:opacity-50"
            >
              @if (isLoading()) {
                <span class="flex items-center justify-center gap-2">
                  <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  جاري الإرسال...
                </span>
              } @else {
                إرسال رابط التعيين
              }
            </button>
          } @else {
            <!-- Success Message -->
            <div class="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span class="text-white text-xl">✓</span>
              </div>
              <p class="text-foreground text-sm font-bold leading-relaxed">
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح. يرجى مراجعة بريدك.
              </p>
            </div>

            <button
              type="button"
              (click)="resetForm()"
              class="w-full btn btn-secondary py-4 rounded-xl text-xs font-black uppercase tracking-widest"
            >
              إرسال رابط آخر
            </button>
          }

          <!-- Back to Login -->
          <div class="text-center pt-2">
            <a routerLink="/login" class="text-muted-foreground hover:text-primary text-[10px] font-black uppercase tracking-widest transition-colors">
              العودة لتسجيل الدخول
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
