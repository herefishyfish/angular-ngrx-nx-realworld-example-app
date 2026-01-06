import { Routes } from '@angular/router';
import { AuthGuard } from '@realworld/auth/data-access';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@realworld/home/feature-home').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.RegisterPageComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('@realworld/settings/feature-settings').then((settings) => settings.SettingsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:username',
    loadChildren: () => import('@realworld/profile/feature-profile').then((profile) => profile.PROFILE_ROUTES),
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('@realworld/articles/article').then((m) => m.ArticleComponent),
  },
  // {
  //   path: 'benchmark',
  //   loadComponent: () => import('./features/memory-footprint.component').then((m) => m.MemoryFootprintComponent),
  // },
  // {
  //   path: 'editor',
  //   loadChildren: () => import('@realworld/articles/article-edit').then((article) => article.ARTICLE_EDIT_ROUTES),
  //   canActivate: [AuthGuard],
  // },
];
