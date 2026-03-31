import { Injectable, signal } from '@angular/core';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  async sendBookingConfirmation(email: string, bookingDetails: any): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const template = this.getBookingTemplate(bookingDetails);
      await this.sendEmail(email, template);
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to send email');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendReviewNotification(email: string, reviewDetails: any): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const template = this.getReviewTemplate(reviewDetails);
      await this.sendEmail(email, template);
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to send email');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendPasswordReset(email: string, resetLink: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const template = this.getPasswordResetTemplate(resetLink);
      await this.sendEmail(email, template);
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to send email');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  private async sendEmail(email: string, template: EmailTemplate): Promise<void> {
    console.log(`Sending email to ${email}:`, template);
  }

  private getBookingTemplate(details: any): EmailTemplate {
    return {
      id: 'booking-confirmation',
      name: 'Booking Confirmation',
      subject: 'Your booking is confirmed!',
      body: `Your booking for ${details.carName} from ${details.startDate} to ${details.endDate} is confirmed.`,
    };
  }

  private getReviewTemplate(details: any): EmailTemplate {
    return {
      id: 'review-notification',
      name: 'Review Notification',
      subject: 'Thank you for your review!',
      body: `Thank you for reviewing ${details.carName}. Your review helps other customers.`,
    };
  }

  private getPasswordResetTemplate(resetLink: string): EmailTemplate {
    return {
      id: 'password-reset',
      name: 'Password Reset',
      subject: 'Reset your password',
      body: `Click here to reset your password: ${resetLink}`,
    };
  }

  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }
}
