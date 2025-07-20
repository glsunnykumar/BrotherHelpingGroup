import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
      children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
     {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
    }]