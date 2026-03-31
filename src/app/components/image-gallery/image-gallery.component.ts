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
      <div class="relative bg-slate-800 rounded-lg overflow-hidden h-96 border border-slate-700 shadow-glow">
        <img
          [src]="images[currentIndex()]"
          [alt]="'Car image ' + (currentIndex() + 1)"
          class="w-full h-full object-cover"
          [@fadeInOut]
        />
        <!-- Zoom Button -->
        <button
          (click)="toggleZoom()"
          class="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-slate-300 rounded-full p-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-slate-800 hover:text-white transition-all duration-300 border border-slate-600"
          title="Zoom"
        >
          🔍
        </button>
        <!-- Navigation Arrows -->
        @if (images.length > 1) {
          <button
            (click)="previousImage()"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur-sm text-slate-300 rounded-full w-10 h-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-slate-800 hover:text-white transition-all duration-300 border border-slate-600"
          >
            ‹
          </button>
          <button
            (click)="nextImage()"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur-sm text-slate-300 rounded-full w-10 h-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-slate-800 hover:text-white transition-all duration-300 border border-slate-600"
          >
            ›
          </button>
        }
      </div>

      <!-- Thumbnails -->
      @if (images.length > 1) {
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          @for (image of images; track $index) {
            <button
              (click)="selectImage($index)"
              [class.ring-2]="currentIndex() === $index"
              class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300"
              [ngClass]="currentIndex() === $index ? 'ring-accent border-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-slate-700 hover:border-slate-500 opacity-70 hover:opacity-100'"
            >
              <img [src]="image" [alt]="'Thumbnail ' + ($index + 1)" class="w-full h-full object-cover" />
            </button>
          }
        </div>
      }

      <!-- Image Counter -->
      @if (images.length > 1) {
        <div class="text-center text-sm text-slate-400 font-medium">
          {{ currentIndex() + 1 }} / {{ images.length }}
        </div>
      }

      <!-- Zoom Modal -->
      @if (isZoomed()) {
        <div
          class="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 border-glow"
          (click)="toggleZoom()"
          [@fadeInOut]
        >
          <div class="relative max-w-4xl max-h-screen card p-2 bg-black shadow-[0_0_30px_rgba(59,130,246,0.3)] border-accent/30" (click)="$event.stopPropagation()">
            <img
              [src]="images[currentIndex()]"
              [alt]="'Zoomed car image'"
              class="w-full h-full object-contain max-h-[85vh] rounded"
            />
            <button
              (click)="toggleZoom()"
              class="absolute -top-4 -right-4 bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-error hover:text-white transition-all duration-300 border border-slate-600 shadow-glow"
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
