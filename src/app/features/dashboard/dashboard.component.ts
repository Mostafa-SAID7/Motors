import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../core/models/car.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-page">

      <!-- ── Hero Banner ──────────────────────────────────────────────── -->
      <section class="hero-section">
        <div class="hero-bg"></div>
        <div class="container mx-auto px-6 py-24 relative z-10">
          <div class="animate-fadeInUp max-w-3xl">
            <span class="badge-cinematic inline-block px-4 py-1 rounded-full text-sm font-semibold text-blue-400 mb-6">
              🚗 معرض السيارات الفاخرة
            </span>
            <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              اكتشف سيارة
              <span class="gradient-text block">أحلامك</span>
            </h1>
            <p class="text-xl text-slate-300 mb-10 leading-relaxed">
              تشكيلة مميزة من أفضل السيارات الفاخرة والاقتصادية • جديدة ومستعملة بضمان كامل
            </p>
            <div class="flex flex-wrap gap-4">
              <a routerLink="/cars"
                class="btn btn-primary text-lg px-8 py-4 rounded-xl flex items-center gap-2">
                <span>تصفح السيارات</span>
                <span class="text-xl">→</span>
              </a>
              <a routerLink="/cars/add"
                class="btn btn-secondary text-lg px-8 py-4 rounded-xl">
                أضف سيارة
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Stats Cards ───────────────────────────────────────────────── -->
      <section class="container mx-auto px-6 -mt-12 relative z-20 mb-16">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <div class="stat-card animate-fadeInUp">
            <div class="stat-icon bg-blue-500/20">🚘</div>
            <p class="stat-value">{{ totalCars() }}</p>
            <p class="stat-label">إجمالي السيارات</p>
          </div>

          <div class="stat-card animate-fadeInUp" style="animation-delay:0.1s">
            <div class="stat-icon bg-green-500/20">✨</div>
            <p class="stat-value text-green-400">{{ newCars() }}</p>
            <p class="stat-label">سيارات جديدة</p>
          </div>

          <div class="stat-card animate-fadeInUp" style="animation-delay:0.2s">
            <div class="stat-icon bg-orange-500/20">🔄</div>
            <p class="stat-value text-orange-400">{{ usedCars() }}</p>
            <p class="stat-label">سيارات مستعملة</p>
          </div>

          <div class="stat-card animate-fadeInUp" style="animation-delay:0.3s">
            <div class="stat-icon bg-purple-500/20">⭐</div>
            <p class="stat-value text-purple-400">{{ avgRating() }}</p>
            <p class="stat-label">متوسط التقييم</p>
          </div>

        </div>
      </section>

      <!-- ── Top Brands ─────────────────────────────────────────────────── -->
      <section class="container mx-auto px-6 mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold mb-1">أفضل الماركات</h2>
            <p class="text-slate-400">تصفح حسب ماركتك المفضلة</p>
          </div>
          <a routerLink="/cars" class="text-blue-400 hover:text-blue-300 transition font-semibold">
            عرض الكل ←
          </a>
        </div>

        <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
          @for (brand of topBrands(); track brand.name) {
            <a [routerLink]="['/cars']"
               [queryParams]="{ brand: brand.name }"
               class="brand-card">
              <div class="text-3xl mb-2">{{ brand.icon }}</div>
              <p class="text-sm font-semibold">{{ brand.name }}</p>
              <p class="text-xs text-slate-400">{{ brand.count }} سيارة</p>
            </a>
          }
        </div>
      </section>

      <!-- ── Featured Cars ──────────────────────────────────────────────── -->
      <section class="container mx-auto px-6 mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-3xl font-bold mb-1">سيارات مميزة</h2>
            <p class="text-slate-400">الأعلى تقييماً في معرضنا</p>
          </div>
          <a routerLink="/cars" class="text-blue-400 hover:text-blue-300 transition font-semibold">
            عرض الكل ←
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (car of featuredCars(); track car.id) {
            <a [routerLink]="['/cars', car.id]" class="featured-card hover-lift">

              <!-- Image -->
              <div class="featured-img-wrap">
                <img [src]="car.images[0]"
                     [alt]="car.brand + ' ' + car.model"
                     class="featured-img"
                     loading="lazy" />
                <div class="featured-img-overlay"></div>
                <!-- Badge -->
                <span class="featured-badge"
                      [class.badge-new]="car.condition === 'new'"
                      [class.badge-used]="car.condition === 'used'">
                  {{ car.condition === 'new' ? 'جديد' : 'مستعمل' }}
                </span>
                <!-- Price -->
                <div class="featured-price">\${{ car.price | number }}</div>
              </div>

              <!-- Info -->
              <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                  <div>
                    <h3 class="text-lg font-bold">{{ car.brand }} {{ car.model }}</h3>
                    <p class="text-slate-400 text-sm">{{ car.year }} • {{ car.color }}</p>
                  </div>
                  <div class="flex items-center gap-1 text-yellow-400 text-sm">
                    <span>★</span>
                    <span class="font-semibold">{{ car.rating }}</span>
                  </div>
                </div>

                <div class="flex gap-3 text-xs text-slate-400 border-t border-slate-700 pt-3 mt-3">
                  <span>⛽ {{ car.fuelType }}</span>
                  <span>⚙️ {{ car.transmission }}</span>
                  <span>🛣️ {{ car.mileage | number }} km</span>
                </div>
              </div>

            </a>
          }
        </div>
      </section>

      <!-- ── CTA Banner ─────────────────────────────────────────────────── -->
      <section class="container mx-auto px-6 mb-16">
        <div class="cta-banner">
          <div class="cta-glow"></div>
          <div class="relative z-10 text-center">
            <h2 class="text-3xl font-bold mb-3">هل تريد بيع سيارتك؟</h2>
            <p class="text-slate-300 mb-6 text-lg">أضف سيارتك الآن واوصل لآلاف المشترين المحتملين</p>
            <a routerLink="/cars/add"
              class="btn btn-primary text-lg px-10 py-4 rounded-xl inline-block">
              أضف سيارتك مجاناً
            </a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .dashboard-page {
      min-height: 100vh;
    }

    /* Hero */
    .hero-section {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
      border-bottom: 1px solid rgba(59,130,246,0.15);
    }
    .hero-bg {
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.25) 0%, transparent 70%),
        url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=50') center/cover no-repeat;
      opacity: 0.15;
    }

    /* Stats */
    .stat-card {
      @apply glass-effect rounded-2xl p-5 text-center;
      backdrop-filter: blur(20px);
    }
    .stat-icon {
      @apply w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3;
    }
    .stat-value {
      @apply text-4xl font-black text-white mb-1;
    }
    .stat-label {
      @apply text-sm text-slate-400 font-medium;
    }

    /* Brands */
    .brand-card {
      @apply glass-effect rounded-xl p-4 text-center cursor-pointer;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .brand-card:hover {
      @apply border-blue-500;
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(59,130,246,0.25);
    }

    /* Featured Car Cards */
    .featured-card {
      @apply glass-effect rounded-2xl overflow-hidden cursor-pointer block;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    }
    .featured-card:hover {
      @apply border-blue-500;
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(59,130,246,0.25);
    }
    .featured-img-wrap {
      position: relative;
      height: 220px;
      overflow: hidden;
    }
    .featured-img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .featured-card:hover .featured-img {
      transform: scale(1.05);
    }
    .featured-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(15,23,42,0.8) 0%, transparent 60%);
    }
    .featured-badge {
      position: absolute; top: 12px; right: 12px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
    }
    .badge-new {
      background: rgba(16,185,129,0.9);
      color: white;
    }
    .badge-used {
      background: rgba(245,158,11,0.9);
      color: white;
    }
    .featured-price {
      position: absolute; bottom: 12px; left: 12px;
      font-size: 20px;
      font-weight: 900;
      color: white;
      text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }

    /* CTA */
    .cta-banner {
      position: relative;
      padding: 60px 40px;
      border-radius: 24px;
      background: linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%);
      border: 1px solid rgba(59,130,246,0.3);
      overflow: hidden;
    }
    .cta-glow {
      position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);
      pointer-events: none;
    }
  `],
})
export class DashboardComponent implements OnInit {
  private carService = inject(CarService);

  allCars = signal<Car[]>([]);

  totalCars = computed(() => this.allCars().length);
  newCars = computed(() => this.allCars().filter(c => c.condition === 'new').length);
  usedCars = computed(() => this.allCars().filter(c => c.condition === 'used').length);
  avgRating = computed(() => {
    const cars = this.allCars().filter(c => c.rating);
    if (!cars.length) return '0.0';
    return (cars.reduce((sum, c) => sum + (c.rating || 0), 0) / cars.length).toFixed(1);
  });

  featuredCars = computed(() =>
    [...this.allCars()]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6)
  );

  topBrands = computed(() => {
    const brandMap = new Map<string, number>();
    this.allCars().forEach(c => brandMap.set(c.brand, (brandMap.get(c.brand) || 0) + 1));
    const icons: Record<string, string> = {
      BMW: '🚙', 'Mercedes-Benz': '⭐', Audi: '💎',
      Toyota: '🏆', Honda: '🔵', Volkswagen: '🚗',
      Porsche: '🏎️', 'Range Rover': '🦁',
    };
    return Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count, icon: icons[name] || '🚘' }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  });

  ngOnInit(): void {
    this.carService.getCars().subscribe(cars => this.allCars.set(cars));
  }
}
