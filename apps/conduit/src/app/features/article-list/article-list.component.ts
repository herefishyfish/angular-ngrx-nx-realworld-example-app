import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleListComponentBase, ArticleListItemComponent } from '@realworld/articles/articles-list';
import { PagerComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article-list',
  templateUrl: '../../../../../../libs/articles/feature-articles-list/src/article-list.component.html',
  imports: [ArticleListItemComponent, PagerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends ArticleListComponentBase {}
