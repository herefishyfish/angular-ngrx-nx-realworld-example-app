import { Directive, effect, inject, untracked } from '@angular/core';
import { ArticlesListStore, ListType, articlesListInitialState } from '@realworld/articles/data-access';
import { AuthStore } from '@realworld/auth/data-access';
import { HomeStore } from './home.store';

@Directive()
export abstract class HomeComponentBase {
  /** Optional - only provided for web where parent controls the list */
  protected readonly articlesListStore = inject(ArticlesListStore, { optional: true });
  protected readonly authStore = inject(AuthStore);
  protected readonly homeStore = inject(HomeStore);

  $listConfig = this.articlesListStore?.listConfig;
  $tags = this.homeStore.tags;

  readonly loadArticlesOnLogin = effect(() => {
    const isLoggedIn = this.authStore.loggedIn();
    untracked(() => this.getArticles(isLoggedIn));
  });

  setListTo(type: ListType = 'ALL') {
    if (!this.articlesListStore) return;
    const config = { ...articlesListInitialState.listConfig, type };
    this.articlesListStore.setListConfig(config);
    this.articlesListStore.loadArticles(this.$listConfig?.() ?? config);
  }

  getArticles(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    if (!this.articlesListStore) return;
    this.articlesListStore.setListConfig({
      ...articlesListInitialState.listConfig,
      filters: {
        ...articlesListInitialState.listConfig.filters,
        tag,
      },
    });
    this.articlesListStore.loadArticles(this.$listConfig?.() ?? articlesListInitialState.listConfig);
  }

  /** Override in platform-specific implementations */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openDrawer(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onPagerLoaded(_args: unknown): void {}

  /** Tab selection for NativeScript pager - override in .ns.ts */
  selectedTabIndex = 0;
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  selectTab(_index: number): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onPagerIndexChanged(_event: unknown): void {}

  /** NativeScript pager properties - override in .ns.ts */
  readonly tabs: { name: string; type: 'FEED' | 'ALL' }[] = [];
  pagerScroll = (): number => 0;

  /** Pull to refresh - override in .ns.ts */
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onRefresh(_args: unknown): void {}
}
