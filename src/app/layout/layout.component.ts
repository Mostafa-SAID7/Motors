import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col relative w-full" dir="rtl">
      <!-- Fixed Header for persistence -->
      <app-header class="sticky top-0 z-50"></app-header>
      
      <main class="flex-grow w-full relative z-10 pt-10 overflow-y-auto">
        <!-- Content Wrapper -->
        <div class="animate-fadeInUp w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Minimalist Footer -->
      <app-footer></app-footer>
    </div>
  `,
})
export class LayoutComponent {}
