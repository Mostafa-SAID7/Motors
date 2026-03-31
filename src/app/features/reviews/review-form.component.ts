import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

export interface Review {
  id: string;
  carId: string;
  userId: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
}

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12 animate-fadeInUp">
      <a routerLink="/cars" class="text-accent hover:text-accent-light hover:underline mb-6 inline-block transition-colors">← Back to Cars</a>

      <div class="max-w-2xl mx-auto card p-8 border-glow">
        <h2 class="text-3xl font-bold mb-6 gradient-text">Write a Review</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Author Name -->
          <div class="form-group">
            <label class="block text-sm font-semibold mb-2 text-slate-300">Your Name</label>
            <input
              formControlName="author"
              type="text"
              placeholder="John Doe"
              class="w-full input"
            />
            @if (form.get('author')?.invalid && form.get('author')?.touched) {
              <p class="text-error text-sm mt-1">Name is required</p>
            }
          </div>

          <!-- Rating -->
          <div class="form-group">
            <label class="block text-sm font-semibold mb-2 text-slate-300">Rating</label>
            <div class="flex gap-2">
              @for (i of [1, 2, 3, 4, 5]; track i) {
                <button
                  type="button"
                  (click)="setRating(i)"
                  [class.text-warning]="form.get('rating')?.value >= i"
                  [class.text-slate-600]="form.get('rating')?.value < i"
                  class="text-4xl transition-colors hover:scale-110 drop-shadow-md"
                >
                  ★
                </button>
              }
            </div>
            @if (form.get('rating')?.value) {
              <p class="text-sm text-slate-400 mt-2">{{ form.get('rating')?.value }} out of 5 stars</p>
            }
          </div>

          <!-- Comment -->
          <div class="form-group">
            <label class="block text-sm font-semibold mb-2 text-slate-300">Your Review</label>
            <textarea
              formControlName="comment"
              rows="6"
              placeholder="Share your experience with this car..."
              class="w-full input resize-none"
            ></textarea>
            @if (form.get('comment')?.invalid && form.get('comment')?.touched) {
              <p class="text-error text-sm mt-1">Review must be at least 10 characters</p>
            }
          </div>

          <!-- Submit -->
          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="!form.valid || isLoading()"
              class="flex-1 btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading() ? 'Submitting...' : 'Submit Review' }}
            </button>
            <button
              type="button"
              (click)="resetForm()"
              class="flex-1 btn btn-secondary text-white py-3 border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ReviewFormComponent {
  form: FormGroup;
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  setRating(rating: number): void {
    this.form.get('rating')?.setValue(rating);
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.notificationService.success('Thank you for your review!');
        this.router.navigate(['/cars']);
        this.isLoading.set(false);
      }, 500);
    }
  }

  resetForm(): void {
    this.form.reset({ rating: 0 });
  }
}
