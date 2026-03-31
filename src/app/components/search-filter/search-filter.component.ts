import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterOptions, SortOptions } from '../../core/services/car.service';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
      <!-- Search Bar -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (input)="onSearchChange()"
          placeholder="Search by brand, model, or description..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Filters Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Brand Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Brand</label>
          <select
            [(ngModel)]="filters.brand"
            (change)="onFilterChange()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Brands</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Volkswagen">Volkswagen</option>
          </select>
        </div>

        <!-- Condition Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <select
            [(ngModel)]="filters.condition"
            (change)="onFilterChange()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        <!-- Fuel Type Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
          <select
            [(ngModel)]="filters.fuelType"
            (change)="onFilterChange()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <!-- Transmission Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
          <select
            [(ngModel)]="filters.transmission"
            (change)="onFilterChange()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Transmissions</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <!-- Min Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Min Price ($)</label>
          <input
            type="number"
            [(ngModel)]="filters.minPrice"
            (change)="onFilterChange()"
            placeholder="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Max Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Max Price ($)</label>
          <input
            type="number"
            [(ngModel)]="filters.maxPrice"
            (change)="onFilterChange()"
            placeholder="999999"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Sort Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            [(ngModel)]="sortField"
            (change)="onSortChange()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="price">Price</option>
            <option value="year">Year</option>
            <option value="mileage">Mileage</option>
            <option value="brand">Brand</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Order</label>
          <select
            [(ngModel)]="sortDirection"
            (change)="onSortChange()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4">
        <button
          (click)="resetFilters()"
          class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Reset Filters
        </button>
        <button
          (click)="applyFilters()"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Apply Filters
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
