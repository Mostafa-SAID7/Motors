import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-24 text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <a routerLink="/" class="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
        Go Home
      </a>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .bg-secondary { @apply bg-red-600; }
    }
  `],
})
export class NotFoundComponent {}
