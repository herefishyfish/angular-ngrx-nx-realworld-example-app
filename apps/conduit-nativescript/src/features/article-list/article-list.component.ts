import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleListComponentBase, ArticleListItemComponent } from '@realworld/articles/articles-list';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { CollectionViewModule } from '@nativescript-community/ui-collectionview/angular';

@Component({
  selector: 'cdt-article-list',
  templateUrl: './article-list.component.html',
  imports: [NativeScriptCommonModule, ArticleListItemComponent, CollectionViewModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends ArticleListComponentBase {
  loadMoreArticles() {
    const config = this.$listConfig();
    const currentLimit = config.filters.limit ?? 10;
    const articlesCount = this.articlesListStore.articles().articlesCount;
    
    if (currentLimit < articlesCount) {
      const newLimit = currentLimit + 10;
      this.articlesListStore.setListConfig({
        ...config,
        filters: {
          ...config.filters,
          limit: newLimit,
        },
      });
      this.articlesListStore.loadArticles(this.$listConfig());
    }
  }
}
