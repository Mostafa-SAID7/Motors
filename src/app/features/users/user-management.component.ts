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
    <div class="container mx-auto px-4 py-12 animate-fadeInUp">
      <h1 class="text-4xl font-bold mb-8 gradient-text">User Management</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">Total Users</p>
          <p class="text-3xl font-bold text-white">{{ users().length }}</p>
        </div>
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">Active Users</p>
          <p class="text-3xl font-bold text-accent">{{ activeUsers() }}</p>
        </div>
        <div class="card p-6 border-glow">
          <p class="text-slate-400 text-sm">New Users (30 days)</p>
          <p class="text-3xl font-bold text-success">{{ newUsers() }}</p>
        </div>
      </div>

      <!-- Users Table -->
      <div class="card overflow-hidden p-0 border-glow">
        <div class="p-6 border-b border-slate-700 bg-slate-800/50">
          <h2 class="text-2xl font-bold text-white">Users</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-slate-300">
            <thead class="bg-slate-900 border-b border-slate-700 text-slate-400">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Name</th>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Role</th>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Bookings</th>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Reviews</th>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Joined</th>
                <th class="px-6 py-4 text-left text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700">
              @for (user of users(); track user.id) {
                <tr class="hover:bg-slate-800/50 transition-colors duration-200">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-glow">
                        {{ getInitials(user.displayName) }}
                      </div>
                      <span class="font-semibold text-white">{{ user.displayName }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ user.email }}</td>
                  <td class="px-6 py-4">
                    <span
                      [class.bg-accent_20]="user.role === 'admin'"
                      [class.text-accent-light]="user.role === 'admin'"
                      [class.border-accent]="user.role === 'admin'"
                      [class.bg-success_20]="user.role === 'user'"
                      [class.text-success]="user.role === 'user'"
                      [class.border-success]="user.role === 'user'"
                      class="px-3 py-1 rounded-full text-xs font-semibold border"
                    >
                      {{ user.role | uppercase }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-400">{{ user.bookings }}</td>
                  <td class="px-6 py-4 text-slate-400">{{ user.reviews }}</td>
                  <td class="px-6 py-4 text-slate-400">{{ user.createdAt | date: 'short' }}</td>
                  <td class="px-6 py-4">
                    <button (click)="viewUser(user.id)" class="text-accent hover:text-accent-light hover:underline mr-4 transition-colors">
                      View
                    </button>
                    <button (click)="editUser(user.id)" class="text-success hover:text-green-400 hover:underline mr-4 transition-colors">
                      Edit
                    </button>
                    <button (click)="deleteUser(user.id)" class="text-error hover:text-red-400 hover:underline transition-colors">
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
