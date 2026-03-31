import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-6 right-6 z-50 space-y-3 pointer-events-none">
      @for (notification of notifications(); track notification.id) {
        <div
          [ngClass]="getSeverityClass(notification.severity)"
          [@slideIn]
          class="p-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-96 backdrop-blur-xl border pointer-events-auto cursor-pointer hover:shadow-2xl transition-all duration-300"
          (click)="remove(notification.id)"
        >
          <span [ngClass]="getIconClass(notification.severity)" class="text-2xl flex-shrink-0">
            @switch (notification.severity) {
              @case ('success') {
                ✓
              }
              @case ('error') {
                ✕
              }
              @case ('warning') {
                ⚠
              }
              @case ('info') {
                ℹ
              }
            }
          </span>
          <span class="flex-1 text-sm font-medium">{{ notification.message }}</span>
          <button
            (click)="remove(notification.id); $event.stopPropagation()"
            class="text-lg leading-none hover:opacity-70 flex-shrink-0"
          >
            ×
          </button>
        </div>
      }
    </div>
  `,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(400px)', opacity: 0 }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(400px)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ToastComponent {
  private notificationService = inject(NotificationService);
  notifications = this.notificationService.getNotifications();

  constructor() {}

  remove(id: string): void {
    this.notificationService.remove(id);
  }

  getSeverityClass(severity: string): string {
    const baseClass = 'font-semibold';
    switch (severity) {
      case 'success':
        return `${baseClass} bg-gradient-to-r from-green-600 to-green-500 text-white border border-green-400/30`;
      case 'error':
        return `${baseClass} bg-gradient-to-r from-red-600 to-red-500 text-white border border-red-400/30`;
      case 'warning':
        return `${baseClass} bg-gradient-to-r from-yellow-600 to-yellow-500 text-white border border-yellow-400/30`;
      case 'info':
        return `${baseClass} bg-gradient-to-r from-blue-600 to-blue-500 text-white border border-blue-400/30`;
      default:
        return `${baseClass} bg-gradient-to-r from-gray-600 to-gray-500 text-white border border-gray-400/30`;
    }
  }

  getIconClass(severity: string): string {
    return 'font-bold';
  }
}
