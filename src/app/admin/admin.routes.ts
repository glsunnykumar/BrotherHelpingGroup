import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin-layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      // routerLink="/admin/add-post"
      {
        path: 'request',
        loadComponent: () =>
          import('./user-request/user-request.component').then(
            (m) => m.UserRequestComponent,
          ),
      },

      {
        path: 'manage-posts',
        loadComponent: () =>
          import('./manage-posts/manage-posts.component').then(
            (m) => m.ManagePostsComponent,
          ),
      },

      {
        path: 'events',
        loadComponent: () =>
          import('./event/manage-events/manage-events.component').then(
            (m) => m.ManageEventsComponent,
          ),
      },

      {
        path: 'add-event',
        loadComponent: () =>
          import('./event/add-edit-event/add-edit-event.component').then(
            (m) => m.AddEditEventComponent,
          ),
      },

      {
        path: 'edit-event/:id',
        loadComponent: () =>
          import('./event/add-edit-event/add-edit-event.component').then(
            (m) => m.AddEditEventComponent,
          ),
      },

      {
        path: 'add-post',
        loadComponent: () =>
          import('./add-edit-post/add-edit-post.component').then(
            (m) => m.AddEditPostComponent,
          ),
      },

      {
        path: 'edit-post/:id',
        loadComponent: () =>
          import('./add-edit-post/add-edit-post.component').then(
            (m) => m.AddEditPostComponent,
          ),
      },

      {
        path: 'member',
        loadComponent: () =>
          import('./admin-member/admin-member.component').then(
            (m) => m.AdminMemberComponent,
          ),
      },
      {
        path: 'member/:id',
        loadComponent: () =>
          import('././member/member.component').then(
            (m) => m.AddMemberComponent,
          ),
      },

      {
        path: 'contribution',
        loadComponent: () =>
          import('./contribution-dialog/contribution-dialog.component').then(
            (m) => m.ContributionDialogComponent,
          ),
      },
      {
        path: 'contribution-list',
        loadComponent: () =>
          import('./contribution-list/contribution-list.component').then(
            (m) => m.ContributionListComponent,
          ),
      },
    ],
  },
];
