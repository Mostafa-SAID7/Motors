import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-app',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <!-- Header -->
      <div class="container mx-auto px-4 py-12">
        <h1 class="text-5xl font-bold mb-4">Motors Mobile App</h1>
        <p class="text-xl text-gray-400 mb-8">Book cars on the go with our mobile app</p>
      </div>

      <!-- Features -->
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div class="bg-gray-800 rounded-lg p-6">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-bold mb-2">Easy Booking</h3>
            <p class="text-gray-400">Book cars in seconds with our intuitive mobile interface</p>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <div class="text-4xl mb-4">🔔</div>
            <h3 class="text-xl font-bold mb-2">Real-time Notifications</h3>
            <p class="text-gray-400">Get instant updates on your bookings and reservations</p>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <div class="text-4xl mb-4">💳</div>
            <h3 class="text-xl font-bold mb-2">Secure Payments</h3>
            <p class="text-gray-400">Safe and encrypted payment processing</p>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <div class="text-4xl mb-4">📍</div>
            <h3 class="text-xl font-bold mb-2">GPS Tracking</h3>
            <p class="text-gray-400">Track your rental car in real-time</p>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <div class="text-4xl mb-4">⭐</div>
            <h3 class="text-xl font-bold mb-2">Ratings & Reviews</h3>
            <p class="text-gray-400">Read and write reviews for cars</p>
          </div>

          <div class="bg-gray-800 rounded-lg p-6">
            <div class="text-4xl mb-4">❤️</div>
            <h3 class="text-xl font-bold mb-2">Favorites</h3>
            <p class="text-gray-400">Save your favorite cars for quick access</p>
          </div>
        </div>

        <!-- Download Section -->
        <div class="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-12 text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Download Now</h2>
          <p class="text-xl mb-8">Available on iOS and Android</p>
          <div class="flex gap-4 justify-center flex-wrap">
            <button class="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              App Store
            </button>
            <button class="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Google Play
            </button>
          </div>
        </div>

        <!-- Screenshots -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-8 text-center">App Screenshots</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-800 rounded-lg p-4 h-96 flex items-center justify-center">
              <p class="text-gray-400">Home Screen</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-4 h-96 flex items-center justify-center">
              <p class="text-gray-400">Booking Screen</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-4 h-96 flex items-center justify-center">
              <p class="text-gray-400">Profile Screen</p>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="mb-12">
          <h2 class="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div class="space-y-4">
            <div class="bg-gray-800 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-2">Is the app free?</h3>
              <p class="text-gray-400">Yes, the app is free to download and use. You only pay for bookings.</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-2">What devices are supported?</h3>
              <p class="text-gray-400">iOS 12+ and Android 8+ are supported.</p>
            </div>
            <div class="bg-gray-800 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-2">Can I cancel bookings from the app?</h3>
              <p class="text-gray-400">Yes, you can manage and cancel bookings directly from the app.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MobileAppComponent {}
