import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarService, FilterOptions, SortOptions } from '../../../core/services/car.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Car } from '../../../core/models/car.model';
import { SearchFilterComponent } from '../../../components/search-filter/search-filter.component';
import { CarCardComponent } from '../../../components/car-card/car-card.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { SkeletonLoaderComponent } from '../../../components/skeleton-loader/skeleton-loader.component';

type ViewMode = 'card' | 'table';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SearchFilterComponent,
    CarCardComponent,
    PaginationComponent,
    SkeletonLoaderComponent,
  ],
  template: `
    <div class="container mx-auto px-6 py-10 animate-fadeInUp">

      <!-- ── Page Header ───────────────────────────────────────────── -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-4xl font-black mb-1">🚗 معرض السيارات</h1>
          <p class="text-slate-400">
            {{ filteredCars().length | number }} سيارة متاحة
            @if (isUsingInsForge()) {
              <span class="badge-cinematic text-green-400 text-xs px-2 py-0.5 rounded-full mr-2">🔴 مباشر</span>
            }
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- View Toggle -->
          <div class="flex items-center glass-effect rounded-xl p-1">
            <button id="btn-card-view"
              (click)="setView('card')"
              class="view-toggle-btn"
              [class.active]="viewMode() === 'card'"
              title="عرض البطاقات">
              ⊞
            </button>
            <button id="btn-table-view"
              (click)="setView('table')"
              class="view-toggle-btn"
              [class.active]="viewMode() === 'table'"
              title="عرض الجدول">
              ☰
            </button>
          </div>

          <!-- Add Car -->
          <a id="btn-add-car" routerLink="/cars/add"
            class="btn btn-primary px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold">
            <span>+ أضف سيارة</span>
          </a>
        </div>
      </div>

      <!-- ── Filters ────────────────────────────────────────────────── -->
      <div class="mb-8">
        <app-search-filter
          (searchChange)="onSearchChange($event)"
          (filterChange)="onFilterChange($event)"
          (sortChange)="onSortChange($event)">
        </app-search-filter>
      </div>

      <!-- ── Favorites Banner ───────────────────────────────────────── -->
      @if (showFavoritesOnly()) {
        <div class="mb-6 glass-effect rounded-xl px-5 py-4 flex items-center justify-between border-blue-500/30">
          <div>
            <p class="font-bold text-blue-300">❤️ عرض المفضلة فقط</p>
            <p class="text-sm text-slate-400">{{ favoriteCount() }} سيارة في مفضلتك</p>
          </div>
          <button (click)="toggleFavoritesOnly()"
            class="btn btn-secondary px-4 py-2 rounded-lg text-sm">
            عرض الكل
          </button>
        </div>
      }

      <!-- ── Loading ────────────────────────────────────────────────── -->
      @if (isLoading()) {
        <app-skeleton-loader type="card" [count]="6"></app-skeleton-loader>
      }

      <!-- ── Empty State ────────────────────────────────────────────── -->
      @if (!isLoading() && paginatedCars().length === 0) {
        <div class="text-center py-24">
          <div class="text-7xl mb-6">🔍</div>
          <h3 class="text-2xl font-bold mb-2">لا توجد سيارات</h3>
          <p class="text-slate-400 mb-6">لم يتم العثور على سيارات تطابق بحثك</p>
          <button (click)="resetFilters()"
            class="btn btn-primary px-8 py-3 rounded-xl">
            إعادة تعيين الفلاتر
          </button>
        </div>
      }

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- CARD VIEW                                                    -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      @if (!isLoading() && paginatedCars().length > 0 && viewMode() === 'card') {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          @for (car of paginatedCars(); track car.id) {
            <app-car-card
              [car]="car"
              [isFavorite]="carService.isFavorite(car.id)"
              (favoriteToggle)="toggleFavorite($event)"
              (compareClick)="addToComparison($event)">
            </app-car-card>
          }
        </div>
      }

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- TABLE VIEW                                                   -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      @if (!isLoading() && paginatedCars().length > 0 && viewMode() === 'table') {
        <div class="glass-effect rounded-2xl overflow-hidden mb-8">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-700 bg-slate-800/60">
                <th class="text-right px-5 py-4 font-bold text-slate-300">السيارة</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300 hidden md:table-cell">السنة</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300">السعر</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300 hidden lg:table-cell">الحالة</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300 hidden lg:table-cell">الوقود</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300 hidden xl:table-cell">المسافة</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300 hidden md:table-cell">التقييم</th>
                <th class="text-center px-4 py-4 font-bold text-slate-300">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              @for (car of paginatedCars(); track car.id; let even = $even) {
                <tr class="table-row-item border-b border-slate-700/50"
                    [class.bg-slate-800/20]="even">
                  <!-- Car Name + Image -->
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <img [src]="car.images[0]"
                           [alt]="car.brand"
                           class="w-14 h-10 object-cover rounded-lg flex-shrink-0" />
                      <div>
                        <p class="font-bold text-white">{{ car.brand }} {{ car.model }}</p>
                        <p class="text-xs text-slate-400">{{ car.color }}</p>
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-4 text-center text-slate-300 hidden md:table-cell">{{ car.year }}</td>

                  <td class="px-4 py-4 text-center">
                    <span class="font-bold text-blue-400">\${{ car.price | number }}</span>
                  </td>

                  <td class="px-4 py-4 text-center hidden lg:table-cell">
                    <span class="px-2 py-1 rounded-full text-xs font-bold"
                          [class.bg-green-500/20]="car.condition === 'new'"
                          [class.text-green-400]="car.condition === 'new'"
                          [class.bg-orange-500/20]="car.condition === 'used'"
                          [class.text-orange-400]="car.condition === 'used'">
                      {{ car.condition === 'new' ? 'جديد' : 'مستعمل' }}
                    </span>
                  </td>

                  <td class="px-4 py-4 text-center text-slate-300 hidden lg:table-cell">{{ car.fuelType }}</td>

                  <td class="px-4 py-4 text-center text-slate-300 hidden xl:table-cell">
                    {{ car.mileage | number }} km
                  </td>

                  <td class="px-4 py-4 text-center hidden md:table-cell">
                    <div class="flex items-center justify-center gap-1 text-yellow-400">
                      <span>★</span>
                      <span class="text-white font-semibold">{{ car.rating || '—' }}</span>
                    </div>
                  </td>

                  <td class="px-4 py-4">
                    <div class="flex items-center justify-center gap-2">
                      <a [routerLink]="['/cars', car.id]"
                        class="icon-btn text-blue-400" title="عرض">👁️</a>
                      <a [routerLink]="['/cars', car.id, 'edit']"
                        class="icon-btn text-slate-300" title="تعديل">✏️</a>
                      <button (click)="toggleFavorite(car.id)"
                        class="icon-btn"
                        [class.text-red-400]="carService.isFavorite(car.id)"
                        [class.text-slate-400]="!carService.isFavorite(car.id)"
                        title="مفضلة">
                        {{ carService.isFavorite(car.id) ? '❤️' : '🤍' }}
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      <!-- ── Pagination ─────────────────────────────────────────────── -->
      @if (!isLoading() && filteredCars().length > itemsPerPage()) {
        <app-pagination
          [totalItems]="filteredCars().length"
          [itemsPerPage]="itemsPerPage()"
          [currentPage]="currentPage()"
          (pageChange)="onPageChange($event)"
          (itemsPerPageChange)="onItemsPerPageChange($event)">
        </app-pagination>
      }

      <!-- ── Comparison Panel ───────────────────────────────────────── -->
      @if (comparisonList().length > 0) {
        <div class="mt-10 glass-effect rounded-2xl p-6 border-blue-500/20">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-xl font-bold">🔄 المقارنة ({{ comparisonList().length }})</h3>
            <button (click)="clearComparison()"
              class="btn px-4 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/20 text-sm">
              مسح الكل
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-slate-700">
                  <th class="text-right py-2 px-4 text-slate-400 font-semibold">الخاصية</th>
                  @for (carId of comparisonList(); track carId) {
                    @if (getCarById(carId); as car) {
                      <th class="text-center py-2 px-4 font-bold">{{ car.brand }} {{ car.model }}</th>
                    }
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of comparisonRows; track row.key) {
                  <tr class="border-b border-slate-700/50">
                    <td class="py-3 px-4 font-semibold text-slate-400">{{ row.label }}</td>
                    @for (carId of comparisonList(); track carId) {
                      @if (getCarById(carId); as car) {
                        <td class="py-3 px-4 text-center text-white">{{ row.value(car) }}</td>
                      }
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .view-toggle-btn {
      @apply px-3 py-2 rounded-lg text-slate-400 font-bold text-lg transition-all duration-200;
    }
    .view-toggle-btn.active {
      @apply bg-blue-600 text-white;
    }
    .icon-btn {
      @apply text-lg cursor-pointer hover:scale-125 transition-transform duration-150;
    }
    .table-row-item {
      transition: background 0.15s ease;
    }
    .table-row-item:hover {
      background: rgba(59,130,246,0.06) !important;
    }
  `],
})
export class CarsListComponent implements OnInit {
  currentPage = signal(1);
  itemsPerPage = signal(9);
  showFavoritesOnly = signal(false);
  comparisonList = signal<string[]>([]);
  isLoading = signal(false);
  viewMode = signal<ViewMode>('card');

  filteredCars = computed(() => this.carService.filteredAndSortedCars());
  favoriteCount = computed(() => this.carService.favoritesList().length);

  paginatedCars = computed(() => {
    const filtered = this.showFavoritesOnly()
      ? this.carService.getFavorites()
      : this.filteredCars();
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return filtered.slice(start, start + this.itemsPerPage());
  });

  // Comparison table row definitions
  comparisonRows: { key: string; label: string; value: (c: Car) => string }[] = [
    { key: 'price',        label: 'السعر',           value: c => `$${c.price.toLocaleString()}` },
    { key: 'year',         label: 'السنة',           value: c => String(c.year) },
    { key: 'mileage',      label: 'المسافة',         value: c => `${c.mileage.toLocaleString()} km` },
    { key: 'fuelType',     label: 'الوقود',          value: c => c.fuelType },
    { key: 'transmission', label: 'ناقل الحركة',    value: c => c.transmission },
    { key: 'engineSize',   label: 'حجم المحرك',     value: c => c.engineSize },
    { key: 'condition',    label: 'الحالة',          value: c => c.condition === 'new' ? 'جديد' : 'مستعمل' },
    { key: 'rating',       label: 'التقييم',         value: c => c.rating ? `${c.rating}/5` : '—' },
  ];

  constructor(
    public carService: CarService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 500);
  }

  isUsingInsForge(): boolean {
    return this.carService.isUsingInsForge();
  }

  setView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  onSearchChange(term: string): void {
    this.carService.search(term);
    this.currentPage.set(1);
  }

  onFilterChange(filters: FilterOptions): void {
    this.carService.setFilters(filters);
    this.currentPage.set(1);
  }

  onSortChange(sort: SortOptions): void {
    this.carService.setSortOptions(sort);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onItemsPerPageChange(items: number): void {
    this.itemsPerPage.set(items);
    this.currentPage.set(1);
  }

  toggleFavorite(carId: string): void {
    this.carService.toggleFavorite(carId);
    const isFav = this.carService.isFavorite(carId);
    this.notificationService.success(isFav ? '❤️ تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة');
  }

  toggleFavoritesOnly(): void {
    this.showFavoritesOnly.update(v => !v);
    this.currentPage.set(1);
  }

  addToComparison(carId: string): void {
    const current = this.comparisonList();
    if (current.includes(carId)) {
      this.comparisonList.set(current.filter(id => id !== carId));
      this.notificationService.info('تمت الإزالة من المقارنة');
    } else if (current.length < 4) {
      this.comparisonList.set([...current, carId]);
      this.notificationService.success('تمت الإضافة للمقارنة ✅');
    } else {
      this.notificationService.warning('لا يمكن مقارنة أكثر من 4 سيارات');
    }
  }

  clearComparison(): void {
    this.comparisonList.set([]);
    this.notificationService.info('تم مسح المقارنة');
  }

  getCarById(id: string): Car | undefined {
    return this.carService.getCarById(id);
  }

  resetFilters(): void {
    this.carService.search('');
    this.carService.setFilters({});
    this.carService.setSortOptions({ field: 'price', direction: 'asc' });
    this.currentPage.set(1);
    this.showFavoritesOnly.set(false);
    this.notificationService.info('تم إعادة تعيين الفلاتر');
  }
}
