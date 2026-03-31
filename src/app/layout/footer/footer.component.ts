import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-primary text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="text-lg font-bold text-secondary mb-4">Motors</h3>
            <p class="text-gray-400">Your trusted car showroom</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">Quick Links</h4>
            <ul class="text-gray-400 space-y-2">
              <li><a href="#" class="hover:text-secondary">Home</a></li>
              <li><a href="#" class="hover:text-secondary">Cars</a></li>
              <li><a href="#" class="hover:text-secondary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Contact</h4>
            <p class="text-gray-400">Email: info@motors.com</p>
            <p class="text-gray-400">Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host ::ng-deep {
      .bg-primary { @apply bg-gray-900; }
      .text-secondary { @apply text-red-600; }
    }
  `],
})
export class FooterComponent {}
