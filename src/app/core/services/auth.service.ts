import { Injectable, signal } from '@angular/core';
import { SdkService } from './sdk.service';
import { NotificationService } from './notification.service';

/**
 * Authentication Service
 * Handles user authentication using SDK
 */
export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<AuthUser | null>(null);
  private isLoading = signal(false);
  private error = signal<string | null>(null);
  private isAuthenticated = signal(false);

  constructor(
    private sdk: SdkService,
    private notificationService: NotificationService
  ) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    if (!this.sdk.isInitialized_()) {
      return;
    }

    try {
      const client = this.sdk.getClient();
      if (!client) return;

      // Get current user: GET /api/auth/sessions/current
      const { data, error } = await client.auth.getCurrentUser();

      if (error) {
        console.log('No authenticated user');
        return;
      }

      if (data) {
        this.currentUser.set(data as AuthUser);
        this.isAuthenticated.set(true);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
    }
  }

  // Register new user
  async register(email: string, password: string, displayName?: string): Promise<boolean> {
    if (!this.sdk.isInitialized_()) {
      this.notificationService.error('Authentication not available');
      return false;
    }

    try {
      this.isLoading.set(true);
      const client = this.sdk.getClient();

      if (!client) {
        throw new Error('SDK client not available');
      }

      // Register: POST /api/auth/users
      const { data, error } = await client.auth.signUp(email, password);

      if (error) {
        throw error;
      }

      this.error.set(null);
      this.isLoading.set(false);
      this.notificationService.success('Registration successful! Check your email to verify.');
      return true;
    } catch (err) {
      const errorMessage = this.getErrorMessage(err);
      this.error.set(errorMessage);
      this.isLoading.set(false);
      this.notificationService.error(errorMessage);
      return false;
    }
  }

  // Login with email and password
  async login(email: string, password: string): Promise<boolean> {
    if (!this.sdk.isInitialized_()) {
      this.notificationService.error('Authentication not available');
      return false;
    }

    try {
      this.isLoading.set(true);
      const client = this.sdk.getClient();

      if (!client) {
        throw new Error('SDK client not available');
      }

      // Login: POST /api/auth/sessions
      const { data, error } = await client.auth.signIn(email, password);

      if (error) {
        throw error;
      }

      if (data) {
        this.currentUser.set(data as AuthUser);
        this.isAuthenticated.set(true);
      }

      this.error.set(null);
      this.isLoading.set(false);
      this.notificationService.success('Login successful!');
      return true;
    } catch (err) {
      const errorMessage = this.getErrorMessage(err);
      this.error.set(errorMessage);
      this.isLoading.set(false);
      this.notificationService.error(errorMessage);
      return false;
    }
  }

  // Logout
  async logout(): Promise<boolean> {
    if (!this.sdk.isInitialized_()) {
      this.notificationService.error('Authentication not available');
      return false;
    }

    try {
      this.isLoading.set(true);
      const client = this.sdk.getClient();

      if (!client) {
        throw new Error('SDK client not available');
      }

      // Logout: POST /api/auth/sessions/logout
      const { error } = await client.auth.signOut();

      if (error) {
        throw error;
      }

      this.currentUser.set(null);
      this.isAuthenticated.set(false);
      this.error.set(null);
      this.isLoading.set(false);
      this.notificationService.success('Logged out successfully');
      return true;
    } catch (err) {
      const errorMessage = this.getErrorMessage(err);
      this.error.set(errorMessage);
      this.isLoading.set(false);
      this.notificationService.error(errorMessage);
      return false;
    }
  }

  // Send password reset email
  async resetPassword(email: string): Promise<boolean> {
    if (!this.sdk.isInitialized_()) {
      this.notificationService.error('Authentication not available');
      return false;
    }

    try {
      this.isLoading.set(true);
      const client = this.sdk.getClient();

      if (!client) {
        throw new Error('SDK client not available');
      }

      // Send reset: POST /api/auth/email/send-reset-password
      const { error } = await client.auth.resetPassword(email);

      if (error) {
        throw error;
      }

      this.error.set(null);
      this.isLoading.set(false);
      this.notificationService.success('Password reset email sent. Check your inbox.');
      return true;
    } catch (err) {
      const errorMessage = this.getErrorMessage(err);
      this.error.set(errorMessage);
      this.isLoading.set(false);
      this.notificationService.error(errorMessage);
      return false;
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser.asReadonly();
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // Get loading state
  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  // Get error
  getError() {
    return this.error.asReadonly();
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }

  // Helper to get user-friendly error messages
  private getErrorMessage(error: any): string {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.message) {
      const msg = error.message.toLowerCase();

      if (msg.includes('email')) {
        return 'Invalid email address';
      } else if (msg.includes('password')) {
        return 'Invalid password';
      } else if (msg.includes('already')) {
        return 'Email already in use';
      } else if (msg.includes('not found')) {
        return 'User not found';
      } else if (msg.includes('unauthorized')) {
        return 'Unauthorized access';
      }

      return error.message;
    }

    return 'An error occurred';
  }
}
