import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-12 animate-fadeInUp">
      <h1 class="text-4xl font-bold mb-8 text-glow gradient-text">Analytics Dashboard</h1>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">Total Revenue</p>
          <p class="text-3xl font-bold text-white">$ {{ totalRevenue() | number }}</p>
          <p class="text-success text-sm mt-2">↑ 12% from last month</p>
        </div>
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">Total Bookings</p>
          <p class="text-3xl font-bold text-white">{{ totalBookings() }}</p>
          <p class="text-success text-sm mt-2">↑ 8% from last month</p>
        </div>
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">Average Rating</p>
          <p class="text-3xl font-bold text-white">{{ avgRating() }}/5</p>
          <p class="text-warning text-sm mt-2">★ Excellent</p>
        </div>
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">Customer Satisfaction</p>
          <p class="text-3xl font-bold text-white">{{ satisfaction() }}%</p>
          <p class="text-success text-sm mt-2">↑ 5% from last month</p>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Revenue Chart -->
        <div class="card p-6 border-glow">
          <h2 class="text-xl font-bold mb-4 text-white">Monthly Revenue</h2>
          <div class="space-y-4">
            @for (month of months(); track month.name) {
              <div>
                <div class="flex justify-between mb-1 text-slate-300">
                  <span class="text-sm font-semibold">{{ month.name }}</span>
                  <span class="text-sm text-accent">$ {{ month.revenue | number }}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 border border-slate-700">
                  <div
                    class="bg-blue-600 h-2 rounded-full shadow-glow"
                    [style.width.%]="(month.revenue / 5000) * 100"
                  ></div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Booking Status -->
        <div class="card p-6 border-glow">
          <h2 class="text-xl font-bold mb-4 text-white">Booking Status</h2>
          <div class="space-y-4 text-slate-300">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-success rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span>Confirmed</span>
              </div>
              <span class="font-bold text-white">{{ confirmedBookings() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-warning rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                <span>Pending</span>
              </div>
              <span class="font-bold text-white">{{ pendingBookings() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 bg-error rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <span>Cancelled</span>
              </div>
              <span class="font-bold text-white">{{ cancelledBookings() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Cars -->
      <div class="card overflow-hidden p-0 border-glow animate-fadeInUp" style="animation-delay: 0.2s">
        <div class="p-6 border-b border-slate-700 bg-slate-800/50">
          <h2 class="text-xl font-bold text-white">Top Performing Cars</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-slate-300">
            <thead class="bg-slate-900 border-b border-slate-700 text-slate-400">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold">Car</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Bookings</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Revenue</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700">
              @for (car of topCars(); track car.id) {
                <tr class="hover:bg-slate-800/50 transition-colors duration-200">
                  <td class="px-6 py-4 font-semibold text-white">{{ car.name }}</td>
                  <td class="px-6 py-4">{{ car.bookings }}</td>
                  <td class="px-6 py-4 text-accent font-bold">$ {{ car.revenue | number }}</td>
                  <td class="px-6 py-4 text-warning font-bold">{{ car.rating }}/5</td>
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
