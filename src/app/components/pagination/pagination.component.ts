import { Component, Output, EventEmitter, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 animate-fadeInUp">
      <!-- Items per page selector -->
      <div class="flex items-center gap-2">
        <label class="text-sm font-semibold text-slate-300">Items per page:</label>
        <select
          [value]="itemsPerPage()"
          (change)="onItemsPerPageChange($event)"
          class="px-3 py-1.5 bg-slate-900 border border-slate-600 rounded-lg text-sm text-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none shadow-glow cursor-pointer transition-all duration-300"
        >
          <option value="6" class="bg-slate-800">6</option>
          <option value="12" class="bg-slate-800">12</option>
          <option value="24" class="bg-slate-800">24</option>
          <option value="48" class="bg-slate-800">48</option>
        </select>
      </div>

      <!-- Pagination Info -->
      <div class="text-sm text-slate-400">
        Showing <span class="text-white font-medium">{{ startItem() }}</span> to <span class="text-white font-medium">{{ endItem() }}</span> of <span class="text-white font-medium">{{ totalItems() }}</span> items
      </div>

      <!-- Pagination Controls -->
      <div class="flex gap-2">
        <button
          (click)="previousPage()"
          [disabled]="currentPage() === 1"
          class="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          ← Prev
        </button>

        <!-- Page Numbers -->
        <div class="flex gap-2">
          @for (page of pageNumbers(); track page) {
            <button
              (click)="goToPage(page)"
              [class.bg-accent]="page === currentPage()"
              [class.text-white]="page === currentPage()"
              [class.border-accent]="page === currentPage()"
              [class.shadow-glow]="page === currentPage()"
              [class.border-slate-600]="page !== currentPage()"
              [class.text-slate-300]="page !== currentPage()"
              [class.hover:bg-slate-800]="page !== currentPage()"
              class="w-10 h-10 border rounded-lg transition-all duration-300 flex items-center justify-center font-medium"
            >
              {{ page }}
            </button>
          }
        </div>

        <button
          (click)="nextPage()"
          [disabled]="currentPage() === totalPages()"
          class="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Next →
        </button>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  totalItems = input<number>(0);
  itemsPerPage = input<number>(6);
  currentPage = input<number>(1);
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage()));
  startItem = computed(() => (this.currentPage() - 1) * this.itemsPerPage() + 1);
  endItem = computed(() => Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems()));

  pageNumbers = computed(() => {
    const pages: number[] = [];
    const maxPages = 5;
    const total = this.totalPages();

    if (total <= maxPages) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      const current = this.currentPage();
      const start = Math.max(1, current - 2);
      const end = Math.min(total, current + 2);

      if (start > 1) pages.push(1);
      if (start > 2) pages.push(-1); // -1 represents ellipsis

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < total - 1) pages.push(-1); // -1 represents ellipsis
      if (end < total) pages.push(total);
    }

    return pages;
  });

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.itemsPerPageChange.emit(parseInt(value, 10));
  }
}
