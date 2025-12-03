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
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('@realworld/auth/feature-auth').then((m) => m.RegisterComponent),
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
    loadComponent: () => import('./features/article/article.page').then((m) => m.ArticlePage),
  },
  // {
  //   path: 'editor',
  //   loadChildren: () => import('@realworld/articles/article-edit').then((article) => article.ARTICLE_EDIT_ROUTES),
  //   canActivate: [AuthGuard],
  // },
];
