import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = signal<Notification[]>([]);

  getNotifications() {
    return this.notifications.asReadonly();
  }

  show(message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'info', duration = 3000): void {
    const id = Date.now().toString();
    const notification: Notification = { id, message, severity, duration };

    this.notifications.update(notifs => [...notifs, notification]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  remove(id: string): void {
    this.notifications.update(notifs => notifs.filter(n => n.id !== id));
  }

  clear(): void {
    this.notifications.set([]);
  }
}
