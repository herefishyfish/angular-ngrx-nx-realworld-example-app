import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesListStore } from '@realworld/articles/data-access';

@Directive()
export abstract class ArticleListComponentBase {
  protected readonly articlesListStore = inject(ArticlesListStore);
  protected readonly router = inject(Router);

  $totalPages = this.articlesListStore.totalPages;
  $articles = this.articlesListStore.articles.entities;
  $listConfig = this.articlesListStore.listConfig;
  $isLoading = this.articlesListStore.getArticlesLoading;

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
}
