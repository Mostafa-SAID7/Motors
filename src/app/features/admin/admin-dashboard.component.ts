import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-transparent">
      <!-- Header -->
      <div class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 border-b border-blue-500/20 shadow-glow">
        <div class="container mx-auto px-4 animate-fadeInUp">
          <h1 class="text-4xl font-bold text-glow">Admin Dashboard</h1>
          <p class="text-slate-400 mt-2">Manage cars, users, and bookings</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="container mx-auto px-4 py-8 animate-fadeInUp" style="animation-delay: 0.1s">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 border-glow">
            <p class="text-slate-400 text-sm">Total Cars</p>
            <p class="text-3xl font-bold text-white">{{ totalCars() }}</p>
          </div>
          <div class="card p-6 border-glow">
            <p class="text-slate-400 text-sm">Total Users</p>
            <p class="text-3xl font-bold text-white">{{ totalUsers() }}</p>
          </div>
          <div class="card p-6 border-glow">
            <p class="text-slate-400 text-sm">Total Bookings</p>
            <p class="text-3xl font-bold text-white">{{ totalBookings() }}</p>
          </div>
          <div class="card p-6 border-glow">
            <p class="text-slate-400 text-sm">Revenue</p>
            <p class="text-3xl font-bold text-success">$ {{ totalRevenue() | number }}</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 mb-6">
          <button
            (click)="activeTab.set('cars')"
            [class.bg-blue-600]="activeTab() === 'cars'"
            [class.text-white]="activeTab() === 'cars'"
            [class.bg-slate-800]="activeTab() !== 'cars'"
            [class.text-slate-300]="activeTab() !== 'cars'"
            class="px-6 py-2 rounded-lg font-semibold transition hover:bg-slate-700"
          >
            Cars
          </button>
          <button
            (click)="activeTab.set('users')"
            [class.bg-blue-600]="activeTab() === 'users'"
            [class.text-white]="activeTab() === 'users'"
            [class.bg-slate-800]="activeTab() !== 'users'"
            [class.text-slate-300]="activeTab() !== 'users'"
            class="px-6 py-2 rounded-lg font-semibold transition hover:bg-slate-700"
          >
            Users
          </button>
          <button
            (click)="activeTab.set('bookings')"
            [class.bg-blue-600]="activeTab() === 'bookings'"
            [class.text-white]="activeTab() === 'bookings'"
            [class.bg-slate-800]="activeTab() !== 'bookings'"
            [class.text-slate-300]="activeTab() !== 'bookings'"
            class="px-6 py-2 rounded-lg font-semibold transition hover:bg-slate-700"
          >
            Bookings
          </button>
        </div>

        <!-- Cars Tab -->
        @if (activeTab() === 'cars') {
          <div class="card overflow-hidden p-0 border-glow animate-fadeInUp">
            <div class="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-white">Car Management</h2>
              <a routerLink="/cars/add" class="btn btn-primary px-4 py-2">
                Add Car
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-slate-300">
                <thead class="bg-slate-900 border-b border-slate-700 text-slate-400">
                  <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Car</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Price</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Condition</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700">
                  @for (car of cars(); track car.id) {
                    <tr class="hover:bg-slate-800/50 transition-colors duration-200">
                      <td class="px-6 py-4 font-semibold text-white">{{ car.brand }} {{ car.model }}</td>
                      <td class="px-6 py-4 text-accent font-bold">$ {{ car.price | number }}</td>
                      <td class="px-6 py-4">
                        <span class="px-2 py-1 rounded text-xs font-bold bg-slate-700">{{ car.condition | uppercase }}</span>
                      </td>
                      <td class="px-6 py-4 text-warning font-bold">{{ car.rating }}/5</td>
                      <td class="px-6 py-4">
                        <a [routerLink]="['/cars', car.id, 'edit']" class="text-accent hover:text-accent-light hover:underline mr-4 transition-colors">
                          Edit
                        </a>
                        <button (click)="deleteCar(car.id)" class="text-error hover:text-red-400 hover:underline transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- Users Tab -->
        @if (activeTab() === 'users') {
          <div class="card p-6 border-glow animate-fadeInUp">
            <h2 class="text-2xl font-bold mb-6 text-white">User Management</h2>
            <div class="space-y-4">
              @for (user of users(); track user.id) {
                <div class="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p class="font-semibold text-white">{{ user.displayName }}</p>
                    <p class="text-slate-400 text-sm">{{ user.email }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button class="text-accent hover:text-accent-light hover:underline transition-colors">View</button>
                    <button class="text-error hover:text-red-400 hover:underline transition-colors">Remove</button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Bookings Tab -->
        @if (activeTab() === 'bookings') {
          <div class="card overflow-hidden p-0 border-glow animate-fadeInUp">
            <div class="p-6 border-b border-slate-700 bg-slate-800/50">
              <h2 class="text-2xl font-bold text-white">Booking Management</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-slate-300">
                <thead class="bg-slate-900 border-b border-slate-700 text-slate-400">
                  <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Booking ID</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Car</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Dates</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-700">
                  @for (booking of bookings(); track booking.id) {
                    <tr class="hover:bg-slate-800/50 transition-colors duration-200">
                      <td class="px-6 py-4 font-mono text-slate-400">{{ booking.id }}</td>
                      <td class="px-6 py-4 font-semibold text-white">{{ booking.carId }}</td>
                      <td class="px-6 py-4 text-slate-400">{{ booking.startDate | date }} - {{ booking.endDate | date }}</td>
                      <td class="px-6 py-4">
                        <span
                          [class.bg-warning_20]="booking.status === 'pending'"
                          [class.text-warning]="booking.status === 'pending'"
                          [class.bg-success_20]="booking.status === 'confirmed'"
                          [class.text-success]="booking.status === 'confirmed'"
                          [class.bg-error_20]="booking.status === 'cancelled'"
                          [class.text-error]="booking.status === 'cancelled'"
                          class="px-3 py-1 rounded-full text-xs font-bold border"
                        >
                          {{ booking.status | uppercase }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-accent font-bold">$ {{ booking.totalPrice | number }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class AdminDashboardComponent implements OnInit {
  activeTab = signal<'cars' | 'users' | 'bookings'>('cars');
  cars = signal<any[]>([]);
  users = signal<any[]>([]);
  bookings = signal<any[]>([]);

  totalCars = signal(0);
  totalUsers = signal(0);
  totalBookings = signal(0);
  totalRevenue = signal(0);

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const allCars = this.carService.getCarsSignal();
    this.cars.set(allCars());
    this.totalCars.set(allCars().length);

    this.users.set([
      { id: '1', displayName: 'John Doe', email: 'john@example.com' },
      { id: '2', displayName: 'Jane Smith', email: 'jane@example.com' },
    ]);
    this.totalUsers.set(2);

    this.bookings.set([
      {
        id: 'B001',
        carId: '1',
        startDate: new Date(),
        endDate: new Date(),
        status: 'confirmed',
        totalPrice: 500,
      },
    ]);
    this.totalBookings.set(1);
    this.totalRevenue.set(500);
  }

  async deleteCar(carId: string): Promise<void> {
    const success = await this.carService.deleteCar(carId);
    if (success) {
      this.loadData();
    }
  }
}
