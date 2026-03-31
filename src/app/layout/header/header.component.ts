import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 flex justify-center py-8">
      <div class="bg-card/40 backdrop-blur-md border border-border/10 px-10 py-3 rounded-full flex items-center gap-12 shadow-2xl animate-fadeInDown">
        <div class="text-2xl font-black text-gradient font-display tracking-tighter">MOTORS</div>
        
        <nav class="flex gap-10 items-center font-body">
          <a routerLink="/" class="text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-all">المعرض</a>
          <a routerLink="/profile" class="text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-all">الملف الشخصي</a>
          <div class="w-px h-4 bg-border/40 mx-2"></div>
          <a routerLink="/login" class="text-xs font-black text-primary hover:text-primary/80 uppercase tracking-widest transition-all">الحساب</a>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent {}
