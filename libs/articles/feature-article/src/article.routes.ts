import { Routes } from '@angular/router';
import { ArticlePageComponent } from './article.page';

export const ARTICLE_ROUTES: Routes = [
  {
    path: ':slug',
    component: ArticlePageComponent,
  },
];
