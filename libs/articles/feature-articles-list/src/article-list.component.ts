import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleListComponentBase } from './article-list.component.base';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { PagerComponent } from '@realworld/ui/components';

@Component({
  selector: 'cdt-article-list',
  templateUrl: './article-list.component.html',
  imports: [ArticleListItemComponent, PagerComponent],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends ArticleListComponentBase {}
