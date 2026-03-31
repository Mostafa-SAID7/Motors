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
    <div class="container mx-auto px-4 py-12">
      <a routerLink="/cars" class="text-blue-600 hover:underline mb-6 inline-block">← Back to Cars</a>

      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 class="text-3xl font-bold mb-6">Write a Review</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Author Name -->
          <div>
            <label class="block text-sm font-semibold mb-2">Your Name</label>
            <input
              formControlName="author"
              type="text"
              placeholder="John Doe"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            @if (form.get('author')?.invalid && form.get('author')?.touched) {
              <p class="text-red-500 text-sm mt-1">Name is required</p>
            }
          </div>

          <!-- Rating -->
          <div>
            <label class="block text-sm font-semibold mb-2">Rating</label>
            <div class="flex gap-2">
              @for (i of [1, 2, 3, 4, 5]; track i) {
                <button
                  type="button"
                  (click)="setRating(i)"
                  [class.text-yellow-400]="form.get('rating')?.value >= i"
                  [class.text-gray-300]="form.get('rating')?.value < i"
                  class="text-4xl transition"
                >
                  ★
                </button>
              }
            </div>
            @if (form.get('rating')?.value) {
              <p class="text-sm text-gray-600 mt-2">{{ form.get('rating')?.value }} out of 5 stars</p>
            }
          </div>

          <!-- Comment -->
          <div>
            <label class="block text-sm font-semibold mb-2">Your Review</label>
            <textarea
              formControlName="comment"
              rows="6"
              placeholder="Share your experience with this car..."
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            ></textarea>
            @if (form.get('comment')?.invalid && form.get('comment')?.touched) {
              <p class="text-red-500 text-sm mt-1">Review must be at least 10 characters</p>
            }
          </div>

          <!-- Submit -->
          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="!form.valid || isLoading()"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
            >
              {{ isLoading() ? 'Submitting...' : 'Submit Review' }}
            </button>
            <button
              type="button"
              (click)="resetForm()"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
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
