import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SmsService {
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  async sendBookingReminder(phone: string, bookingDetails: any): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const message = `Your booking for ${bookingDetails.carName} is confirmed. Pickup: ${bookingDetails.startDate}`;
      await this.sendSms(phone, message);
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to send SMS');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendVerificationCode(phone: string, code: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const message = `Your verification code is: ${code}`;
      await this.sendSms(phone, message);
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to send SMS');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendCancellationNotice(phone: string, bookingId: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const message = `Your booking ${bookingId} has been cancelled.`;
      await this.sendSms(phone, message);
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to send SMS');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  private async sendSms(phone: string, message: string): Promise<void> {
    console.log(`Sending SMS to ${phone}: ${message}`);
  }

  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }
}
