import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-900 text-white futuristic-bg">
      <div class="relative z-10 animate-fadeInUp">
        <!-- Header -->
        <div class="container mx-auto px-4 py-12 text-center">
          <h1 class="text-5xl font-bold mb-4 gradient-text text-glow">Motors Mobile App</h1>
          <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Book cars on the go with our mobile app</p>
        </div>

        <!-- Features -->
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div class="card p-6 border-glow hover:-translate-y-2 transition-transform duration-300">
              <div class="text-4xl mb-4 text-accent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">📱</div>
              <h3 class="text-xl font-bold mb-2 text-white">Easy Booking</h3>
              <p class="text-slate-400">Book cars in seconds with our intuitive mobile interface</p>
            </div>

            <div class="card p-6 border-glow hover:-translate-y-2 transition-transform duration-300">
              <div class="text-4xl mb-4 text-accent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">🔔</div>
              <h3 class="text-xl font-bold mb-2 text-white">Real-time Notifications</h3>
              <p class="text-slate-400">Get instant updates on your bookings and reservations</p>
            </div>

            <div class="card p-6 border-glow hover:-translate-y-2 transition-transform duration-300">
              <div class="text-4xl mb-4 text-accent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">💳</div>
              <h3 class="text-xl font-bold mb-2 text-white">Secure Payments</h3>
              <p class="text-slate-400">Safe and encrypted payment processing</p>
            </div>

            <div class="card p-6 border-glow hover:-translate-y-2 transition-transform duration-300">
              <div class="text-4xl mb-4 text-accent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">📍</div>
              <h3 class="text-xl font-bold mb-2 text-white">GPS Tracking</h3>
              <p class="text-slate-400">Track your rental car in real-time</p>
            </div>

            <div class="card p-6 border-glow hover:-translate-y-2 transition-transform duration-300">
              <div class="text-4xl mb-4 text-warning drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">⭐</div>
              <h3 class="text-xl font-bold mb-2 text-white">Ratings & Reviews</h3>
              <p class="text-slate-400">Read and write reviews for cars</p>
            </div>

            <div class="card p-6 border-glow hover:-translate-y-2 transition-transform duration-300">
              <div class="text-4xl mb-4 text-error drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">❤️</div>
              <h3 class="text-xl font-bold mb-2 text-white">Favorites</h3>
              <p class="text-slate-400">Save your favorite cars for quick access</p>
            </div>
          </div>

          <!-- Download Section -->
          <div class="card border-glow p-12 text-center mb-12 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-600/20 group-hover:opacity-75 transition-opacity duration-500 rounded-2xl"></div>
            <div class="relative z-10">
              <h2 class="text-4xl font-bold mb-4 text-white">Download Now</h2>
              <p class="text-xl mb-8 text-slate-300">Available on iOS and Android</p>
              <div class="flex gap-4 justify-center flex-wrap">
                <button class="btn btn-primary px-8 py-3 text-lg">
                  App Store
                </button>
                <button class="btn btn-secondary px-8 py-3 text-lg">
                  Google Play
                </button>
              </div>
            </div>
          </div>

          <!-- Screenshots -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold mb-8 text-center text-white">App Screenshots</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="card p-4 h-96 flex items-center justify-center border-glow bg-slate-900/80 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 shadow-glow">
                <p class="text-slate-400 group-hover:text-white transition-colors">Home Screen</p>
              </div>
              <div class="card p-4 h-96 flex items-center justify-center border-glow bg-slate-900/80 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 shadow-glow">
                <p class="text-slate-400 group-hover:text-white transition-colors">Booking Screen</p>
              </div>
              <div class="card p-4 h-96 flex items-center justify-center border-glow bg-slate-900/80 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 shadow-glow">
                <p class="text-slate-400 group-hover:text-white transition-colors">Profile Screen</p>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold mb-8 text-center text-white">Frequently Asked Questions</h2>
            <div class="space-y-4 max-w-3xl mx-auto">
              <div class="card p-6 border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/50">
                <h3 class="text-xl font-bold mb-2 text-white">Is the app free?</h3>
                <p class="text-slate-400">Yes, the app is free to download and use. You only pay for bookings.</p>
              </div>
              <div class="card p-6 border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/50">
                <h3 class="text-xl font-bold mb-2 text-white">What devices are supported?</h3>
                <p class="text-slate-400">iOS 12+ and Android 8+ are supported.</p>
              </div>
              <div class="card p-6 border-slate-700 hover:border-slate-500 transition-colors bg-slate-800/50">
                <h3 class="text-xl font-bold mb-2 text-white">Can I cancel bookings from the app?</h3>
                <p class="text-slate-400">Yes, you can manage and cancel bookings directly from the app.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MobileAppComponent {}
