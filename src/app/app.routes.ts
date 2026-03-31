import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'cars',
        loadComponent: () => import('./features/cars/pages/cars-list.component').then(m => m.CarsListComponent),
      },
      {
        path: 'cars/:id',
        loadComponent: () => import('./features/cars/pages/car-detail.component').then(m => m.CarDetailComponent),
      },
      {
        path: 'cars/add',
        loadComponent: () => import('./features/cars/pages/car-form.component').then(m => m.CarFormComponent),
      },
      {
        path: 'cars/:id/edit',
        loadComponent: () => import('./features/cars/pages/car-form.component').then(m => m.CarFormComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found.component').then(m => m.NotFoundComponent),
  },
];
