import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Main Image -->
      <div class="relative bg-gray-100 rounded-lg overflow-hidden h-96">
        <img
          [src]="images[currentIndex()]"
          [alt]="'Car image ' + (currentIndex() + 1)"
          class="w-full h-full object-cover"
          [@fadeInOut]
        />
        <!-- Zoom Button -->
        <button
          (click)="toggleZoom()"
          class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          title="Zoom"
        >
          🔍
        </button>
        <!-- Navigation Arrows -->
        @if (images.length > 1) {
          <button
            (click)="previousImage()"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            ‹
          </button>
          <button
            (click)="nextImage()"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            ›
          </button>
        }
      </div>

      <!-- Thumbnails -->
      @if (images.length > 1) {
        <div class="flex gap-2 overflow-x-auto pb-2">
          @for (image of images; track $index) {
            <button
              (click)="selectImage($index)"
              [class.ring-2]="currentIndex() === $index"
              class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition"
              [ngClass]="currentIndex() === $index ? 'ring-blue-500 border-blue-500' : 'border-gray-300'"
            >
              <img [src]="image" [alt]="'Thumbnail ' + ($index + 1)" class="w-full h-full object-cover" />
            </button>
          }
        </div>
      }

      <!-- Image Counter -->
      @if (images.length > 1) {
        <div class="text-center text-sm text-gray-600">
          {{ currentIndex() + 1 }} / {{ images.length }}
        </div>
      }

      <!-- Zoom Modal -->
      @if (isZoomed()) {
        <div
          class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          (click)="toggleZoom()"
          [@fadeInOut]
        >
          <div class="relative max-w-4xl max-h-screen" (click)="$event.stopPropagation()">
            <img
              [src]="images[currentIndex()]"
              [alt]="'Zoomed car image'"
              class="w-full h-full object-contain"
            />
            <button
              (click)="toggleZoom()"
              class="absolute top-4 right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200 transition"
            >
              ✕
            </button>
          </div>
        </div>
      }
    </div>
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];

  currentIndex = signal(0);
  isZoomed = signal(false);

  nextImage(): void {
    this.currentIndex.update(i => (i + 1) % this.images.length);
  }

  previousImage(): void {
    this.currentIndex.update(i => (i - 1 + this.images.length) % this.images.length);
  }

  selectImage(index: number): void {
    this.currentIndex.set(index);
  }

  toggleZoom(): void {
    this.isZoomed.update(z => !z);
  }
}
