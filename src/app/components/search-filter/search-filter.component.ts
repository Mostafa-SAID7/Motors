import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions, SortOptions } from '../../core/services/car.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-8 border-glow font-body">
      <!-- Search Bar -->
      <div class="space-y-3 mb-8">
        <label class="text-xs font-black text-muted-foreground uppercase tracking-widest mr-1">ابحث عن سيارة</label>
        <div class="relative">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="onSearchChange()"
            placeholder="ابحث عن الماركة، الموديل، أو المواصفات..."
            class="w-full input pr-12"
          />
          <span class="absolute inset-y-0 right-4 flex items-center text-muted-foreground opacity-50">🔍</span>
        </div>
      </div>

      <!-- Filters Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Brand Filter -->
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">الماركة</label>
          <select
            [(ngModel)]="filters.brand"
            (change)="onFilterChange()"
            class="w-full input"
          >
            <option value="">جميع الماركات</option>
            <option value="BMW">بي إم دبليو (BMW)</option>
            <option value="Mercedes-Benz">مرسيدس بنز (Mercedes-Benz)</option>
            <option value="Audi">أودي (Audi)</option>
            <option value="Toyota">تويوتا (Toyota)</option>
            <option value="Honda">هوندا (Honda)</option>
            <option value="Volkswagen">فولكس واجن (Volkswagen)</option>
          </select>
        </div>

        <!-- Condition Filter -->
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">حالة السيارة</label>
          <select
            [(ngModel)]="filters.condition"
            (change)="onFilterChange()"
            class="w-full input"
          >
            <option value="">جميع الحالات</option>
            <option value="new">جديدة</option>
            <option value="used">مستعملة</option>
          </select>
        </div>

        <!-- Fuel Type Filter -->
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">نوع الوقود</label>
          <select
            [(ngModel)]="filters.fuelType"
            (change)="onFilterChange()"
            class="w-full input"
          >
            <option value="">جميع أنواع الوقود</option>
            <option value="Petrol">بنزين</option>
            <option value="Diesel">ديزل</option>
            <option value="Hybrid">هجين (Hybrid)</option>
            <option value="Electric">كهربائية</option>
          </select>
        </div>

        <!-- Transmission Filter -->
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">ناقل الحركة</label>
          <select
            [(ngModel)]="filters.transmission"
            (change)="onFilterChange()"
            class="w-full input"
          >
            <option value="">جميع النواقل</option>
            <option value="Automatic">أوتوماتيك</option>
            <option value="Manual">يدوي (Manual)</option>
          </select>
        </div>

        <!-- Min Price -->
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">السعر الأدنى (ر.س)</label>
          <input
            type="number"
            [(ngModel)]="filters.minPrice"
            (change)="onFilterChange()"
            placeholder="0"
            class="w-full input"
          />
        </div>

        <!-- Max Price -->
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">السعر الأعلى (ر.س)</label>
          <input
            type="number"
            [(ngModel)]="filters.maxPrice"
            (change)="onFilterChange()"
            placeholder="999,999"
            class="w-full input"
          />
        </div>
      </div>

      <!-- Sort Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">فرز حسب</label>
          <select
            [(ngModel)]="sortField"
            (change)="onSortChange()"
            class="w-full input"
          >
            <option value="price">السعر</option>
            <option value="year">السنة</option>
            <option value="mileage">المسافة المقطوعة</option>
            <option value="brand">الماركة</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-1">الترتيب</label>
          <select
            [(ngModel)]="sortDirection"
            (change)="onSortChange()"
            class="w-full input"
          >
            <option value="asc">تصاعدي</option>
            <option value="desc">تنازلي</option>
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 pt-6">
        <button
          (click)="resetFilters()"
          class="flex-1 btn btn-secondary py-3.5 border border-border text-xs font-black uppercase tracking-widest"
        >
          إعادة تعيين
        </button>
        <button
          (click)="applyFilters()"
          class="flex-1 btn btn-primary py-3.5 text-xs font-black uppercase tracking-widest shadow-glow"
        >
          تطبيق الفلاتر
        </button>
      </div>
    </div>
  `,
})
export class SearchFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<FilterOptions>();
  @Output() sortChange = new EventEmitter<SortOptions>();

  searchTerm = '';
  filters: FilterOptions = {};
  sortField: 'price' | 'year' | 'mileage' | 'brand' = 'price';
  sortDirection: 'asc' | 'desc' = 'asc';

  onSearchChange(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onFilterChange(): void {
    this.filterChange.emit(this.filters);
  }

  onSortChange(): void {
    this.sortChange.emit({
      field: this.sortField,
      direction: this.sortDirection,
    });
  }

  applyFilters(): void {
    this.onFilterChange();
    this.onSortChange();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filters = {};
    this.sortField = 'price';
    this.sortDirection = 'asc';
    this.searchChange.emit('');
    this.filterChange.emit({});
    this.sortChange.emit({ field: 'price', direction: 'asc' });
  }
}
