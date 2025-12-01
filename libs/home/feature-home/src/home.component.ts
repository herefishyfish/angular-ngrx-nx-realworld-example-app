import { effect, inject, untracked } from '@angular/core';
import { ArticlesListStore, ListType, articlesListInitialState } from '@realworld/articles/data-access';
import { AuthStore } from '@realworld/auth/data-access';
import { HomeStore } from './home.store';

export abstract class HomeComponentBase {
  protected readonly articlesListStore = inject(ArticlesListStore);
  protected readonly authStore = inject(AuthStore);
  protected readonly homeStore = inject(HomeStore);

  $listConfig = this.articlesListStore.listConfig;
  $tags = this.homeStore.tags;

  readonly loadArticlesOnLogin = effect(() => {
    const isLoggedIn = this.authStore.loggedIn();
    untracked(() => this.getArticles(isLoggedIn));
  });

  setListTo(type: ListType = 'ALL') {
    const config = { ...articlesListInitialState.listConfig, type };
    this.articlesListStore.setListConfig(config);
    this.articlesListStore.loadArticles(this.$listConfig());
  }

  getArticles(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.articlesListStore.setListConfig({
      ...articlesListInitialState.listConfig,
      filters: {
        ...articlesListInitialState.listConfig.filters,
        tag,
      },
    });
    this.articlesListStore.loadArticles(this.$listConfig());
  }
}
