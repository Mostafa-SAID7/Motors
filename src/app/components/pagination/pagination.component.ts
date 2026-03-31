import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between gap-4 mt-6">
      <!-- Items per page selector -->
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">Items per page:</label>
        <select
          [value]="itemsPerPage"
          (change)="onItemsPerPageChange($event)"
          class="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>

      <!-- Pagination Info -->
      <div class="text-sm text-gray-600">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} items
      </div>

      <!-- Pagination Controls -->
      <div class="flex gap-2">
        <button
          (click)="previousPage()"
          [disabled]="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ← Previous
        </button>

        <!-- Page Numbers -->
        <div class="flex gap-1">
          @for (page of pageNumbers; track page) {
            <button
              (click)="goToPage(page)"
              [class.bg-blue-600]="page === currentPage"
              [class.text-white]="page === currentPage"
              [class.border-blue-600]="page === currentPage"
              class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              {{ page }}
            </button>
          }
        </div>

        <button
          (click)="nextPage()"
          [disabled]="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next →
        </button>
      </div>
    </div>
  `,
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 6;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  totalPages = computed(() => Math.ceil(this.totalItems / this.itemsPerPage));
  startItem = computed(() => (this.currentPage - 1) * this.itemsPerPage + 1);
  endItem = computed(() => Math.min(this.currentPage * this.itemsPerPage, this.totalItems));

  pageNumbers = computed(() => {
    const pages: number[] = [];
    const maxPages = 5;
    const total = this.totalPages();

    if (total <= maxPages) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      const current = this.currentPage;
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
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.pageChange.emit(this.currentPage + 1);
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
