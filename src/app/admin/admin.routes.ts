import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    }]