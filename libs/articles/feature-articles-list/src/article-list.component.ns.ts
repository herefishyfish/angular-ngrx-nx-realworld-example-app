import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ArticleListComponentBase } from './article-list.component.base';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';
import { ArticlesListStore } from '@realworld/articles/data-access';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';

@Component({
  selector: 'cdt-article-list',
  templateUrl: './article-list.component.html',
  imports: [NativeScriptCommonModule, ArticleListItemComponent],
  providers: [ArticlesListStore],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends ArticleListComponentBase {
  onRefresh(args: { object: PullToRefresh }) {
    const pullToRefresh = args.object;
    this.refreshArticles();
    // Stop the refresh indicator after a delay
    setTimeout(() => {
      pullToRefresh.refreshing = false;
    }, 1000);
  }
}
