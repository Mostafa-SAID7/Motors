import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Analytics Dashboard</h1>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">Total Revenue</p>
          <p class="text-3xl font-bold">$ {{ totalRevenue() | number }}</p>
          <p class="text-green-600 text-sm mt-2">↑ 12% from last month</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">Total Bookings</p>
          <p class="text-3xl font-bold">{{ totalBookings() }}</p>
          <p class="text-green-600 text-sm mt-2">↑ 8% from last month</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">Average Rating</p>
          <p class="text-3xl font-bold">{{ avgRating() }}/5</p>
          <p class="text-yellow-600 text-sm mt-2">★ Excellent</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">Customer Satisfaction</p>
          <p class="text-3xl font-bold">{{ satisfaction() }}%</p>
          <p class="text-green-600 text-sm mt-2">↑ 5% from last month</p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Revenue Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Monthly Revenue</h2>
          <div class="space-y-4">
            @for (month of months(); track month.name) {
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-semibold">{{ month.name }}</span>
                  <span class="text-sm">$ {{ month.revenue | number }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-red-600 h-2 rounded-full"
                    [style.width.%]="(month.revenue / 5000) * 100"
                  ></div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Booking Status -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Booking Status</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Confirmed</span>
              </div>
              <span class="font-bold">{{ confirmedBookings() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Pending</span>
              </div>
              <span class="font-bold">{{ pendingBookings() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Cancelled</span>
              </div>
              <span class="font-bold">{{ cancelledBookings() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Cars -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Top Performing Cars</h2>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold">Car</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Bookings</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Revenue</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              @for (car of topCars(); track car.id) {
                <tr class="border-t hover:bg-gray-50">
                  <td class="px-6 py-4">{{ car.name }}</td>
                  <td class="px-6 py-4">{{ car.bookings }}</td>
                  <td class="px-6 py-4">$ {{ car.revenue | number }}</td>
                  <td class="px-6 py-4">{{ car.rating }}/5</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AnalyticsComponent {
  totalRevenue = signal(45000);
  totalBookings = signal(156);
  avgRating = signal(4.7);
  satisfaction = signal(92);

  confirmedBookings = signal(120);
  pendingBookings = signal(25);
  cancelledBookings = signal(11);

  months = signal([
    { name: 'January', revenue: 3500 },
    { name: 'February', revenue: 4200 },
    { name: 'March', revenue: 5000 },
  ]);

  topCars = signal([
    { id: '1', name: 'BMW 3 Series', bookings: 45, revenue: 12000, rating: 4.8 },
    { id: '2', name: 'Mercedes C-Class', bookings: 38, revenue: 11000, rating: 4.7 },
    { id: '3', name: 'Audi A4', bookings: 35, revenue: 10500, rating: 4.6 },
  ]);
}
