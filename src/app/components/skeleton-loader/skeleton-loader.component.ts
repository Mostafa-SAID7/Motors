import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      @for (item of getArray(count); track $index) {
        @switch (type) {
          @case ('card') {
            <div class="bg-gray-200 rounded-lg overflow-hidden">
              <div class="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
              <div class="p-4 space-y-3">
                <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"></div>
                <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          }
          @case ('text') {
            <div class="space-y-2">
              <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse"></div>
              <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>
          }
          @case ('image') {
            <div class="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse"></div>
          }
          @case ('table') {
            <div class="space-y-3">
              @for (row of getArray(5); track $index) {
                <div class="flex gap-4">
                  <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded flex-1 animate-pulse"></div>
                  <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded flex-1 animate-pulse"></div>
                  <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded flex-1 animate-pulse"></div>
                </div>
              }
            </div>
          }
        }
      }
    </div>
  `,
})
export class SkeletonLoaderComponent {
  @Input() type: 'card' | 'text' | 'image' | 'table' = 'card';
  @Input() count: number = 3;

  getArray(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i);
  }
}
