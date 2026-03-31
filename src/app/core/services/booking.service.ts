import { Injectable, signal } from '@angular/core';

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookings = signal<Booking[]>([]);
  private isLoading = signal(false);
  private error = signal<string | null>(null);

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<string | null> {
    try {
      this.isLoading.set(true);
      const newBooking: Booking = {
        ...booking,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      this.bookings.update(b => [...b, newBooking]);
      this.error.set(null);
      return newBooking.id;
    } catch (err) {
      this.error.set('Failed to create booking');
      return null;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getBookings(): Promise<Booking[]> {
    return this.bookings();
  }

  async cancelBooking(bookingId: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.bookings.update(b =>
        b.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
        )
      );
      this.error.set(null);
      return true;
    } catch (err) {
      this.error.set('Failed to cancel booking');
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  getError() {
    return this.error.asReadonly();
  }
}
