import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-primary text-white shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-2xl font-bold text-secondary">Motors</div>
        <nav class="flex gap-6">
          <a routerLink="/" class="hover:text-secondary transition">Home</a>
          <a routerLink="/cars" class="hover:text-secondary transition">Cars</a>
          <a routerLink="/cars/add" class="hover:text-secondary transition">Add Car</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    :host ::ng-deep {
      .bg-primary { @apply bg-gray-900; }
      .text-secondary { @apply text-red-600; }
    }
  `],
})
export class HeaderComponent {}
