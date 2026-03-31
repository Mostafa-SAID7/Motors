import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="focused-page-container font-body">
      <div class="card p-16 text-center max-w-xl mx-auto border-glow shadow-glow-lg animate-fadeInUp">
        <h1 class="text-[120px] font-black font-display text-gradient mb-4 leading-none">٤٠٤</h1>
        <h2 class="text-3xl font-black text-foreground mb-4 font-display">الصفحة غير موجودة</h2>
        <p class="text-muted-foreground mb-12 text-lg font-medium">
          عذراً! يبدو أنك سلكت طريقاً خاطئاً، هذه الصفحة غير متوفرة حالياً.
        </p>
        <a routerLink="/" class="btn btn-primary px-12 py-5 rounded-xl text-sm font-black shadow-glow uppercase tracking-[0.2em] inline-block">
          العودة للمعرض
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
