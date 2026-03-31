import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <div class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold">Admin Dashboard</h1>
          <p class="text-gray-400 mt-2">Manage cars, users, and bookings</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm">Total Cars</p>
            <p class="text-3xl font-bold">{{ totalCars() }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm">Total Users</p>
            <p class="text-3xl font-bold">{{ totalUsers() }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm">Total Bookings</p>
            <p class="text-3xl font-bold">{{ totalBookings() }}</p>
          </div>
          <div class="bg-white rounded-lg shadow p-6">
            <p class="text-gray-600 text-sm">Revenue</p>
            <p class="text-3xl font-bold">$ {{ totalRevenue() | number }}</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 mb-6">
          <button
            (click)="activeTab.set('cars')"
            [class.bg-red-600]="activeTab() === 'cars'"
            [class.text-white]="activeTab() === 'cars'"
            [class.bg-white]="activeTab() !== 'cars'"
            class="px-6 py-2 rounded-lg font-semibold transition"
          >
            Cars
          </button>
          <button
            (click)="activeTab.set('users')"
            [class.bg-red-600]="activeTab() === 'users'"
            [class.text-white]="activeTab() === 'users'"
            [class.bg-white]="activeTab() !== 'users'"
            class="px-6 py-2 rounded-lg font-semibold transition"
          >
            Users
          </button>
          <button
            (click)="activeTab.set('bookings')"
            [class.bg-red-600]="activeTab() === 'bookings'"
            [class.text-white]="activeTab() === 'bookings'"
            [class.bg-white]="activeTab() !== 'bookings'"
            class="px-6 py-2 rounded-lg font-semibold transition"
          >
            Bookings
          </button>
        </div>

        <!-- Cars Tab -->
        @if (activeTab() === 'cars') {
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center">
              <h2 class="text-2xl font-bold">Car Management</h2>
              <a routerLink="/cars/add" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                Add Car
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Car</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Price</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Condition</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (car of cars(); track car.id) {
                    <tr class="border-t hover:bg-gray-50">
                      <td class="px-6 py-4">{{ car.brand }} {{ car.model }}</td>
                      <td class="px-6 py-4">$ {{ car.price | number }}</td>
                      <td class="px-6 py-4">{{ car.condition | uppercase }}</td>
                      <td class="px-6 py-4">{{ car.rating }}/5</td>
                      <td class="px-6 py-4">
                        <a [routerLink]="['/cars', car.id, 'edit']" class="text-blue-600 hover:underline mr-4">
                          Edit
                        </a>
                        <button (click)="deleteCar(car.id)" class="text-red-600 hover:underline">
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
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-bold mb-6">User Management</h2>
            <div class="space-y-4">
              @for (user of users(); track user.id) {
                <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p class="font-semibold">{{ user.displayName }}</p>
                    <p class="text-gray-600 text-sm">{{ user.email }}</p>
                  </div>
                  <div class="flex gap-2">
                    <button class="text-blue-600 hover:underline">View</button>
                    <button class="text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Bookings Tab -->
        @if (activeTab() === 'bookings') {
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-6 border-b">
              <h2 class="text-2xl font-bold">Booking Management</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Booking ID</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Car</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Dates</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th class="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  @for (booking of bookings(); track booking.id) {
                    <tr class="border-t hover:bg-gray-50">
                      <td class="px-6 py-4">{{ booking.id }}</td>
                      <td class="px-6 py-4">{{ booking.carId }}</td>
                      <td class="px-6 py-4">{{ booking.startDate | date }} - {{ booking.endDate | date }}</td>
                      <td class="px-6 py-4">
                        <span
                          [class.bg-yellow-100]="booking.status === 'pending'"
                          [class.bg-green-100]="booking.status === 'confirmed'"
                          [class.bg-red-100]="booking.status === 'cancelled'"
                          class="px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {{ booking.status | uppercase }}
                        </span>
                      </td>
                      <td class="px-6 py-4">$ {{ booking.totalPrice | number }}</td>
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
