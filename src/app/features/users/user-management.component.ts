import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: string;
  createdAt: Date;
  bookings: number;
  reviews: number;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">User Management</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">Total Users</p>
          <p class="text-3xl font-bold">{{ users().length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">Active Users</p>
          <p class="text-3xl font-bold">{{ activeUsers() }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm">New Users (30 days)</p>
          <p class="text-3xl font-bold">{{ newUsers() }}</p>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-6 border-b">
          <h2 class="text-2xl font-bold">Users</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Bookings</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Reviews</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                <th class="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users(); track user.id) {
                <tr class="border-t hover:bg-gray-50">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {{ getInitials(user.displayName) }}
                      </div>
                      <span class="font-semibold">{{ user.displayName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ user.email }}</td>
                  <td class="px-6 py-4">
                    <span
                      [class.bg-blue-100]="user.role === 'admin'"
                      [class.bg-green-100]="user.role === 'user'"
                      class="px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {{ user.role | uppercase }}
                    </span>
                  </td>
                  <td class="px-6 py-4">{{ user.bookings }}</td>
                  <td class="px-6 py-4">{{ user.reviews }}</td>
                  <td class="px-6 py-4">{{ user.createdAt | date: 'short' }}</td>
                  <td class="px-6 py-4">
                    <button (click)="viewUser(user.id)" class="text-blue-600 hover:underline mr-4">
                      View
                    </button>
                    <button (click)="editUser(user.id)" class="text-green-600 hover:underline mr-4">
                      Edit
                    </button>
                    <button (click)="deleteUser(user.id)" class="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class UserManagementComponent implements OnInit {
  users = signal<UserProfile[]>([]);
  activeUsers = signal(0);
  newUsers = signal(0);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    const mockUsers: UserProfile[] = [
      {
        id: '1',
        email: 'john@example.com',
        displayName: 'John Doe',
        role: 'user',
        createdAt: new Date('2026-01-15'),
        bookings: 5,
        reviews: 3,
      },
      {
        id: '2',
        email: 'jane@example.com',
        displayName: 'Jane Smith',
        role: 'admin',
        createdAt: new Date('2025-12-01'),
        bookings: 12,
        reviews: 8,
      },
      {
        id: '3',
        email: 'bob@example.com',
        displayName: 'Bob Johnson',
        role: 'user',
        createdAt: new Date('2026-03-10'),
        bookings: 2,
        reviews: 1,
      },
    ];

    this.users.set(mockUsers);
    this.activeUsers.set(mockUsers.length);
    this.newUsers.set(mockUsers.filter(u => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return u.createdAt > thirtyDaysAgo;
    }).length);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  viewUser(userId: string): void {
    console.log('View user:', userId);
  }

  editUser(userId: string): void {
    console.log('Edit user:', userId);
  }

  deleteUser(userId: string): void {
    this.users.update(u => u.filter(user => user.id !== userId));
  }
}
