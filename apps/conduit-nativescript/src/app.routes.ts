import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  // {
  //   path: 'home',
  //   loadComponent: () => import('@realworld/home/feature-home').then((m) => m.HomeComponent),
  // },
  // {
  //   path: 'login',
  //   loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.LoginComponent),
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.RegisterComponent),
  // },
  // {
  //   path: 'article',
  //   loadChildren: () => import('@realworld/articles/article').then((m) => m.ARTICLE_ROUTES),
  // },
  // {
  //   path: 'settings',
  //   loadComponent: () =>
  //     import('@realworld/settings/feature-settings').then((settings) => settings.SettingsComponent),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'editor',
  //   loadChildren: () => import('@realworld/articles/article-edit').then((article) => article.ARTICLE_EDIT_ROUTES),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('@realworld/profile/feature-profile').then((profile) => profile.PROFILE_ROUTES),
  // },
];
