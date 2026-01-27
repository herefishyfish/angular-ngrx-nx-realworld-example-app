import { Directive, effect, inject, input, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesListStore, ListType, articlesListInitialState } from '@realworld/articles/data-access';

@Directive()
export abstract class ArticleListComponentBase {
  protected readonly articlesListStore = inject(ArticlesListStore);
  protected readonly router = inject(Router);

  /** Optional: When provided, component manages its own data loading */
  listType = input<ListType>();

  $totalPages = this.articlesListStore.totalPages;
  $articles = this.articlesListStore.articles.entities;
  $listConfig = this.articlesListStore.listConfig;
  $isLoading = this.articlesListStore.getArticlesLoading;

  /** Auto-load articles when listType input is provided */
  protected readonly loadOnInit = effect(() => {
    const type = this.listType();
    if (type) {
      untracked(() => {
        const config = { ...articlesListInitialState.listConfig, type };
        this.articlesListStore.setListConfig(config);
        this.articlesListStore.loadArticles(config);
      });
    }
  });

  favorite(slug: string) {
    this.articlesListStore.favouriteArticle(slug);
  }

  unFavorite(slug: string) {
    this.articlesListStore.unFavouriteArticle(slug);
  }

  navigateToArticle(slug: string) {
    this.router.navigate(['/article', slug]);
  }

  setPage(page: number) {
    this.articlesListStore.setListPage(page);
    this.articlesListStore.loadArticles(this.$listConfig());
  }

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

  /** Refresh articles - reloads with current config */
  refreshArticles() {
    this.articlesListStore.loadArticles(this.$listConfig());
  }
}
