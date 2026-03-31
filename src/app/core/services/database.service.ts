import { Injectable, inject } from '@angular/core';
import { SdkService } from './sdk.service';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sdk = inject(SdkService);
  private readonly TABLE_NAME = 'cars';

  async getCars(): Promise<Car[]> {
    try {
      const client = this.sdk.getClient();
      if (!client) return [];

      const { data, error } = await client.database
        .from(this.TABLE_NAME)
        .select('*');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching cars:', error);
      return [];
    }
  }

  async getCarById(id: string): Promise<Car | null> {
    try {
      const client = this.sdk.getClient();
      if (!client) return null;

      const { data, error } = await client.database
        .from(this.TABLE_NAME)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching car:', error);
      return null;
    }
  }

  async addCar(car: Omit<Car, 'id'>): Promise<string | null> {
    try {
      const client = this.sdk.getClient();
      if (!client) return null;

      // Note: inserts require an array format. We add .select().single() to get the inserted record back.
      const { data, error } = await client.database
        .from(this.TABLE_NAME)
        .insert([car])
        .select()
        .single();

      if (error) throw error;
      return data?.id || null;
    } catch (error) {
      console.error('Error adding car:', error);
      return null;
    }
  }

  async updateCar(id: string, car: Partial<Car>): Promise<boolean> {
    try {
      const client = this.sdk.getClient();
      if (!client) return false;

      const { error } = await client.database
        .from(this.TABLE_NAME)
        .update(car)
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating car:', error);
      return false;
    }
  }

  async deleteCar(id: string): Promise<boolean> {
    try {
      const client = this.sdk.getClient();
      if (!client) return false;

      const { error } = await client.database
        .from(this.TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting car:', error);
      return false;
    }
  }
}
