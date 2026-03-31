import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Display Mode -->
      @if (!isEditing) {
        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span [class.text-yellow-400]="i <= (rating || 0)" class="text-2xl">★</span>
            }
          </div>
          <span class="text-lg font-semibold">{{ rating || 0 }}/5</span>
          @if (reviewCount) {
            <span class="text-sm text-gray-600">({{ reviewCount }} reviews)</span>
          }
        </div>
      }

      <!-- Edit Mode -->
      @if (isEditing) {
        <div class="space-y-3">
          <div class="flex gap-2">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <button
                (click)="setRating(i)"
                class="text-3xl transition hover:scale-110"
                [class.text-yellow-400]="i <= hoverRating()"
                [class.text-gray-300]="i > hoverRating()"
                (mouseenter)="hoverRating.set(i)"
                (mouseleave)="hoverRating.set(0)"
              >
                ★
              </button>
            }
          </div>
          <textarea
            [(ngModel)]="comment"
            placeholder="Share your experience with this car..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
          ></textarea>
          <div class="flex gap-2">
            <button
              (click)="submitReview()"
              class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Submit Review
            </button>
            <button
              (click)="cancelEdit()"
              class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      }

      <!-- Reviews List -->
      @if (reviews && reviews.length > 0) {
        <div class="space-y-3 mt-6 pt-6 border-t">
          <h4 class="font-semibold text-gray-800">Recent Reviews</h4>
          @for (review of reviews; track review.id) {
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-gray-800">{{ review.author }}</span>
                  <div class="flex gap-1">
                    @for (i of [1, 2, 3, 4, 5]; track i) {
                      <span [class.text-yellow-400]="i <= review.rating" class="text-sm">★</span>
                    }
                  </div>
                </div>
                <span class="text-xs text-gray-500">{{ review.date | date: 'short' }}</span>
              </div>
              <p class="text-sm text-gray-700">{{ review.comment }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() reviewCount: number = 0;
  @Input() reviews: any[] = [];
  @Input() isEditing: boolean = false;
  @Output() ratingSubmit = new EventEmitter<{ rating: number; comment: string }>();
  @Output() editModeChange = new EventEmitter<boolean>();

  hoverRating = signal(0);
  comment = '';
  tempRating = 0;

  setRating(value: number): void {
    this.tempRating = value;
  }

  submitReview(): void {
    if (this.tempRating > 0) {
      this.ratingSubmit.emit({
        rating: this.tempRating,
        comment: this.comment,
      });
      this.resetForm();
    }
  }

  cancelEdit(): void {
    this.resetForm();
    this.editModeChange.emit(false);
  }

  private resetForm(): void {
    this.tempRating = 0;
    this.comment = '';
    this.hoverRating.set(0);
  }
}
