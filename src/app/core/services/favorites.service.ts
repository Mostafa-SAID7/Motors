import { Injectable, signal } from '@angular/core';

export interface Favorite {
  id: string;
  userId: string;
  carId: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites = signal<Favorite[]>([]);
  private isLoading = signal(false);

  async addFavorite(userId: string, carId: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      const favorite: Favorite = {
        id: Date.now().toString(),
        userId,
        carId,
        createdAt: new Date(),
      };
      this.favorites.update(f => [...f, favorite]);
      return true;
    } catch {
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async removeFavorite(carId: string): Promise<boolean> {
    try {
      this.isLoading.set(true);
      this.favorites.update(f => f.filter(fav => fav.carId !== carId));
      return true;
    } catch {
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async getFavorites(userId: string): Promise<string[]> {
    return this.favorites()
      .filter(f => f.userId === userId)
      .map(f => f.carId);
  }

  isFavorite(carId: string): boolean {
    return this.favorites().some(f => f.carId === carId);
  }

  getIsLoading() {
    return this.isLoading.asReadonly();
  }
}
