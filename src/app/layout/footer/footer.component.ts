import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-12 mt-auto w-full text-center font-body border-t border-border/30 bg-background/50 backdrop-blur-sm">
      <div class="container mx-auto px-6">
        <div class="flex flex-col items-center gap-4">
          <p class="text-muted-foreground text-[12px] font-black tracking-widest uppercase opacity-80">
            Copyright © wework 2022 | Privacy Policy
          </p>
          
          <div class="flex gap-4 opacity-10">
            <div class="w-12 h-px bg-foreground"></div>
            <div class="w-2 h-2 rounded-full bg-primary"></div>
            <div class="w-12 h-px bg-foreground"></div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
