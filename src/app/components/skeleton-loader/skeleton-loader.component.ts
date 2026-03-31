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
            <div class="card overflow-hidden border-glow">
              <div class="h-48 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse"></div>
              <div class="p-4 space-y-3">
                <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse w-[100%] drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]"></div>
                <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded w-5/6 animate-pulse drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]"></div>
                <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded w-4/6 animate-pulse drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]"></div>
              </div>
            </div>
          }
          @case ('text') {
            <div class="space-y-2">
              <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded animate-pulse"></div>
              <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded w-5/6 animate-pulse"></div>
            </div>
          }
          @case ('image') {
            <div class="h-64 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-lg animate-pulse border border-slate-700 shadow-glow"></div>
          }
          @case ('table') {
            <div class="space-y-3">
              @for (row of getArray(5); track $index) {
                <div class="flex gap-4">
                  <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded flex-1 animate-pulse"></div>
                  <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded flex-1 animate-pulse"></div>
                  <div class="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded flex-1 animate-pulse"></div>
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
