import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ── Auth pages (standalone, no layout shell) ──────────────────────────────
  {
    path: 'login',
    loadComponent: () => import('./pages/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },

  // ── Main layout shell (header + footer + router-outlet) ───────────────────
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      // Dashboard
      { path: '', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },

      // Cars — IMPORTANT: static 'add' MUST come before dynamic ':id'
      { path: 'cars', loadComponent: () => import('./features/cars/pages/cars-list.component').then(m => m.CarsListComponent) },
      { path: 'cars/add', canActivate: [authGuard], loadComponent: () => import('./features/cars/pages/car-form.component').then(m => m.CarFormComponent) },
      { path: 'cars/:id', loadComponent: () => import('./features/cars/pages/car-detail.component').then(m => m.CarDetailComponent) },
      { path: 'cars/:id/edit', canActivate: [authGuard], loadComponent: () => import('./features/cars/pages/car-form.component').then(m => m.CarFormComponent) },
      { path: 'cars/:id/book', loadComponent: () => import('./features/bookings/booking-form.component').then(m => m.BookingFormComponent) },
      { path: 'cars/:id/review', loadComponent: () => import('./features/reviews/review-form.component').then(m => m.ReviewFormComponent) },

      // User (protected)
      { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile.component').then(m => m.ProfileComponent) },

      // Admin & features (protected)
      { path: 'admin', canActivate: [authGuard], loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'comparison', loadComponent: () => import('./features/comparison/car-comparison.component').then(m => m.CarComparisonComponent) },
      { path: 'users', canActivate: [authGuard], loadComponent: () => import('./features/users/user-management.component').then(m => m.UserManagementComponent) },
      { path: 'analytics', canActivate: [authGuard], loadComponent: () => import('./features/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      { path: 'payment', loadComponent: () => import('./features/payments/payment.component').then(m => m.PaymentComponent) },
      { path: 'mobile', loadComponent: () => import('./features/mobile/mobile-app.component').then(m => m.MobileAppComponent) },
    ],
  },

  // ── 404 ───────────────────────────────────────────────────────────────────
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component').then(m => m.NotFoundComponent),
  },
];
