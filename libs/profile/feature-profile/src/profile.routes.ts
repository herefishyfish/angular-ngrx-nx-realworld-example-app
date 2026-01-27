import { Routes } from '@angular/router';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { ArticlesListStore } from '@realworld/articles/data-access';
import { AuthGuard } from '@realworld/auth/data-access';
import { profileArticlesResolver, profileFavoritesResolver, profileResolver } from '@realworld/profile/data-access';
import { ProfilePageComponent } from './profile.page';

export const PROFILE_ROUTES: Routes = [
  {
    path: ':username',
    component: ProfilePageComponent,
    resolve: { profileResolver },
    canActivate: [AuthGuard],
    providers: [ArticlesListStore],
    children: [
      {
        path: '',
        component: ArticleListComponent,
        resolve: { profileArticlesResolver },
      },
      {
        path: 'favorites',
        component: ArticleListComponent,
        resolve: { profileFavoritesResolver },
      },
    ],
  },
];