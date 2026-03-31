import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Car } from '../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col animate-fadeInUp hover:border-blue-500">
      <!-- Cinematic Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>

      <!-- Image Container -->
      <div class="relative h-48 bg-slate-900 overflow-hidden">
        <img
          [src]="car.images[0]"
          [alt]="car.brand + ' ' + car.model"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <!-- Cinematic Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40"></div>

        <!-- Favorite Button -->
        <button
          (click)="toggleFavorite()"
          class="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-blue-600 transition-all duration-300 z-20 hover:scale-110"
          [title]="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <span [class.text-red-500]="isFavorite" class="text-xl">
            {{ isFavorite ? '❤' : '🤍' }}
          </span>
        </button>

        <!-- Condition Badge -->
        <div
          [ngClass]="car.condition === 'new' ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-gradient-to-r from-orange-600 to-orange-500'"
          class="absolute top-4 left-4 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg z-20 backdrop-blur-sm"
        >
          {{ car.condition | uppercase }}
        </div>
      </div>

      <!-- Content -->
      <div class="p-5 flex-1 flex flex-col relative z-10">
        <!-- Title -->
        <h3 class="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {{ car.brand }} {{ car.model }}
        </h3>

        <!-- Year and Mileage -->
        <p class="text-sm text-slate-400 mb-3">
          {{ car.year }} • {{ car.mileage | number }} miles
        </p>

        <!-- Rating -->
        @if (car.rating) {
          <div class="flex items-center gap-2 mb-3">
            <span class="text-yellow-400 text-lg">★</span>
            <span class="text-sm font-semibold text-white">{{ car.rating }}</span>
            <span class="text-xs text-slate-500">({{ car.reviews }} reviews)</span>
          </div>
        }

        <!-- Specs Grid -->
        <div class="grid grid-cols-2 gap-2 mb-4 text-xs text-slate-400">
          <div class="bg-slate-800/50 p-2 rounded-lg">
            <span class="text-slate-500">Fuel:</span> {{ car.fuelType }}
          </div>
          <div class="bg-slate-800/50 p-2 rounded-lg">
            <span class="text-slate-500">Trans:</span> {{ car.transmission }}
          </div>
          <div class="bg-slate-800/50 p-2 rounded-lg">
            <span class="text-slate-500">Color:</span> {{ car.color }}
          </div>
          <div class="bg-slate-800/50 p-2 rounded-lg">
            <span class="text-slate-500">Engine:</span> {{ car.engineSize }}
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-400 mb-4 line-clamp-2">
          {{ car.description }}
        </p>

        <!-- Price and Action -->
        <div class="mt-auto space-y-3">
          <div class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            $ {{ car.price | number }}
          </div>
          <div class="flex gap-2">
            <button
              [routerLink]="['/cars', car.id]"
              class="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/50 hover:shadow-2xl"
            >
              View Details
            </button>
            <button
              (click)="compare()"
              class="px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg hover:border-blue-500 hover:bg-slate-600 transition-all duration-300"
              title="Compare"
            >
              ⚖
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggle = new EventEmitter<string>();
  @Output() compareClick = new EventEmitter<string>();

  toggleFavorite(): void {
    this.favoriteToggle.emit(this.car.id);
  }

  compare(): void {
    this.compareClick.emit(this.car.id);
  }
}
