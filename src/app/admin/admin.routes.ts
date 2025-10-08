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
       {
        path: 'request',
        loadComponent: () =>
          import('./user-request/user-request.component').then(
            (m) => m.UserRequestComponent
          ),
      },
 {
        path: 'member',
        loadComponent: () =>
          import('./member/member.component').then(
            (m) => m.AddMemberComponent
          ),
      },

       {
        path: 'contribution',
        loadComponent: () =>
          import('./contribution-dialog/contribution-dialog.component').then(
            (m) => m.ContributionDialogComponent
          ),
      },
        {
        path: 'contribution-list',
        loadComponent: () =>
          import('./contribution-list/contribution-list.component').then(
            (m) => m.ContributionListComponent
          ),
      }
    ]
    }]