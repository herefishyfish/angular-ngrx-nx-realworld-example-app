import { Routes } from '@angular/router';
import { AuthGuard } from '@realworld/auth/data-access';
import { ArticleEditPageComponent } from './article-edit.page';
import { articleEditResolver } from './resolvers/article-edit-resolver';

export const ARTICLE_EDIT_ROUTES: Routes = [
  {
    path: '',
    component: ArticleEditPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleEditPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':slug',
        component: ArticleEditPageComponent,
        resolve: { articleEditResolver },
      },
    ],
  },
];
