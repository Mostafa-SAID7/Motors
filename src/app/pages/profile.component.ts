import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl font-bold">My Profile</h1>
          <p class="text-gray-400 mt-2">Manage your account settings</p>
        </div>
      </div>

      <!-- Content -->
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow p-6">
              <!-- Profile Avatar -->
              <div class="text-center mb-6">
                <div class="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {{ getInitials() }}
                </div>
                <h2 class="text-xl font-bold">{{ currentUser()?.displayName || 'User' }}</h2>
                <p class="text-gray-600 text-sm">{{ currentUser()?.email }}</p>
              </div>

              <!-- Menu -->
              <nav class="space-y-2">
                <button
                  (click)="activeTab.set('profile')"
                  [class.bg-red-50]="activeTab() === 'profile'"
                  [class.text-red-600]="activeTab() === 'profile'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Profile Settings
                </button>
                <button
                  (click)="activeTab.set('bookings')"
                  [class.bg-red-50]="activeTab() === 'bookings'"
                  [class.text-red-600]="activeTab() === 'bookings'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  My Bookings
                </button>
                <button
                  (click)="activeTab.set('favorites')"
                  [class.bg-red-50]="activeTab() === 'favorites'"
                  [class.text-red-600]="activeTab() === 'favorites'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Favorites
                </button>
                <button
                  (click)="activeTab.set('security')"
                  [class.bg-red-50]="activeTab() === 'security'"
                  [class.text-red-600]="activeTab() === 'security'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Security
                </button>
              </nav>

              <!-- Logout Button -->
              <button
                (click)="logout()"
                class="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Profile Tab -->
            @if (activeTab() === 'profile') {
              <div class="bg-white rounded-lg shadow p-8">
                <h3 class="text-2xl font-bold mb-6">Profile Settings</h3>
                <form [formGroup]="profileForm" (ngSubmit)="updateProfile()" class="space-y-6">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-semibold mb-2">First Name</label>
                      <input
                        formControlName="firstName"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-semibold mb-2">Last Name</label>
                      <input
                        formControlName="lastName"
                        type="text"
                        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Email</label>
                    <input
                      formControlName="email"
                      type="email"
                      [disabled]="true"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      formControlName="phone"
                      type="tel"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Address</label>
                    <input
                      formControlName="address"
                      type="text"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    [disabled]="isLoading()"
                    class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    {{ isLoading() ? 'Saving...' : 'Save Changes' }}
                  </button>
                </form>
              </div>
            }

            <!-- Bookings Tab -->
            @if (activeTab() === 'bookings') {
              <div class="bg-white rounded-lg shadow p-8">
                <h3 class="text-2xl font-bold mb-6">My Bookings</h3>
                <p class="text-gray-600">No bookings yet. Start booking your favorite cars!</p>
              </div>
            }

            <!-- Favorites Tab -->
            @if (activeTab() === 'favorites') {
              <div class="bg-white rounded-lg shadow p-8">
                <h3 class="text-2xl font-bold mb-6">Favorite Cars</h3>
                <p class="text-gray-600">No favorites yet. Add cars to your favorites!</p>
              </div>
            }

            <!-- Security Tab -->
            @if (activeTab() === 'security') {
              <div class="bg-white rounded-lg shadow p-8">
                <h3 class="text-2xl font-bold mb-6">Security Settings</h3>
                <form [formGroup]="securityForm" (ngSubmit)="changePassword()" class="space-y-6">
                  <div>
                    <label class="block text-sm font-semibold mb-2">Current Password</label>
                    <input
                      formControlName="currentPassword"
                      type="password"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">New Password</label>
                    <input
                      formControlName="newPassword"
                      type="password"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                      formControlName="confirmPassword"
                      type="password"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    [disabled]="isLoading()"
                    class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition"
                  >
                    {{ isLoading() ? 'Updating...' : 'Change Password' }}
                  </button>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  securityForm: FormGroup;
  activeTab = signal<'profile' | 'bookings' | 'favorites' | 'security'>('profile');
  isLoading = signal(false);
  currentUser = signal<any>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.currentUser.set(user());
  }

  getInitials(): string {
    const name = this.currentUser()?.displayName || 'U';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.notificationService.success('Profile updated successfully');
        this.isLoading.set(false);
      }, 500);
    }
  }

  changePassword(): void {
    if (this.securityForm.valid) {
      const { newPassword, confirmPassword } = this.securityForm.value;
      if (newPassword !== confirmPassword) {
        this.notificationService.error('Passwords do not match');
        return;
      }

      this.isLoading.set(true);
      setTimeout(() => {
        this.notificationService.success('Password changed successfully');
        this.securityForm.reset();
        this.isLoading.set(false);
      }, 500);
    }
  }

  async logout(): Promise<void> {
    const success = await this.authService.logout();
    if (success) {
      this.router.navigate(['/login']);
    }
  }
}
