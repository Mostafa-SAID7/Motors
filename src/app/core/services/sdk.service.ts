import { Injectable, signal } from '@angular/core';
import { createClient } from '@insforge/sdk';

@Injectable({
  providedIn: 'root',
})
export class SdkService {
  private client: any | null = null;
  private isInitialized = signal(false);
  private error = signal<string | null>(null);

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    try {
      const baseUrl = import.meta.env.VITE_INSFORGE_API_BASE_URL;
      const anonKey = import.meta.env.VITE_INSFORGE_API_KEY;

      if (!baseUrl || !anonKey) {
        this.error.set('InsForge configuration not found');
        console.warn('InsForge not configured. Please check your .env file.');
        return;
      }

      // Initialize real InsForge client
      this.client = createClient({
        baseUrl,
        anonKey,
      });

      this.isInitialized.set(true);
      console.log('InsForge SDK initialized successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      this.error.set(errorMessage);
      console.error('SDK initialization error:', err);
    }
  }

  // Getters
  getClient(): any | null {
    return this.client;
  }

  isInitialized_(): boolean {
    return this.isInitialized();
  }

  getError(): string | null {
    return this.error();
  }

  clearError(): void {
    this.error.set(null);
  }
}
