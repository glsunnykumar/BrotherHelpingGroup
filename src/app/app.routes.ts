import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamComponent } from './pages/team/team.component';
import { ContributionComponent } from './pages/contribution/contribution.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contribution', component: ContributionComponent },
  { path: 'about-us', component: AboutUsComponent },
   { path: 'login', component: LoginComponent },
    // ✅ Admin lazy-loaded standalone route
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
  ];

  export const appConfig = {
    providers: [
      provideRouter(routes),
    ],
  };
