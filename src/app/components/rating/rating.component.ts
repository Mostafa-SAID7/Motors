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
          <div class="flex gap-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <span [class.text-warning]="i <= (rating || 0)" [class.text-slate-600]="i > (rating || 0)" class="text-2xl transition-colors">★</span>
            }
          </div>
          <span class="text-lg font-bold text-white">{{ rating || 0 }}/5</span>
          @if (reviewCount) {
            <span class="text-sm text-slate-400">({{ reviewCount }} reviews)</span>
          }
        </div>
      }

      <!-- Edit Mode -->
      @if (isEditing) {
        <div class="space-y-3">
          <div class="flex gap-2 p-4 card border-glow inline-flex w-auto mx-auto justify-center bg-slate-900/50">
            @for (i of [1, 2, 3, 4, 5]; track i) {
              <button
                (click)="setRating(i)"
                class="text-4xl transition-all duration-300 hover:scale-125 focus:outline-none"
                [class.text-warning]="i <= hoverRating() || (tempRating > 0 && i <= tempRating)"
                [class.text-slate-600]="i > hoverRating() && (tempRating === 0 || i > tempRating)"
                [class.drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]]="i <= hoverRating() || (tempRating > 0 && i <= tempRating)"
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
            class="input w-full resize-none min-h-[120px]"
            rows="4"
          ></textarea>
          <div class="flex gap-4">
            <button
              (click)="submitReview()"
              class="flex-1 btn btn-primary"
            >
              Submit Review
            </button>
            <button
              (click)="cancelEdit()"
              class="flex-1 btn btn-secondary border border-slate-600 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      }

      <!-- Reviews List -->
      @if (reviews && reviews.length > 0) {
        <div class="space-y-4 mt-8 pt-8 border-t border-slate-700">
          <h4 class="text-xl font-bold text-white mb-6">Recent Reviews</h4>
          @for (review of reviews; track review.id) {
            <div class="card p-5 border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/50">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <span class="font-bold text-white text-lg block mb-1">{{ review.author }}</span>
                  <div class="flex gap-1 drop-shadow-[0_0_5px_rgba(250,204,21,0.3)]">
                    @for (i of [1, 2, 3, 4, 5]; track i) {
                      <span [class.text-warning]="i <= review.rating" [class.text-slate-600]="i > review.rating" class="text-sm">★</span>
                    }
                  </div>
                </div>
                <span class="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded-full border border-slate-700">{{ review.date | date: 'short' }}</span>
              </div>
              <p class="text-slate-300 leading-relaxed">{{ review.comment }}</p>
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
