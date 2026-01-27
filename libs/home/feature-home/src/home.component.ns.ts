import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, OnDestroy, inject, signal, ViewChildren, QueryList } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { HomeComponentBase } from './home.component.base';
import { HomeStore } from './home.store';
import { ArticleListComponent } from '@realworld/articles/articles-list';
import { DRAWER_SERVICE } from './drawer.service';
import { ColorTransitionPipe } from './pipes/color-transition.pipe';
import { LoadEventData } from '@nativescript/core';
import { Pager } from '@nativescript-community/ui-pager';
import { PagerModule } from '@nativescript-community/ui-pager/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, ArticleListComponent, PagerModule, ColorTransitionPipe],
  providers: [HomeStore],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends HomeComponentBase implements OnDestroy {
  private readonly drawerService = inject(DRAWER_SERVICE, { optional: true });
  @ViewChildren(ArticleListComponent) articleLists!: QueryList<ArticleListComponent>;
  
  pager: Pager | null = null;
  override pagerScroll = signal(0);
  #scrollCallback = (scrollArgs: unknown) => {
    const position = (scrollArgs as { currentPosition?: number })['currentPosition'];
    if (position !== undefined) {
      this.pagerScroll.set(position);
    }
  };
  
  override selectedTabIndex = 0;
  
  override readonly tabs = [
    { name: 'Global Feed', type: 'ALL' as const },
    { name: 'Your Feed', type: 'FEED' as const },
  ];

  override openDrawer() {
    this.drawerService?.open();
  }

  override getArticles(isLoggedIn: boolean) {
    // Set initial tab based on login status - each list loads its own data
    // Index 0 = Global Feed, Index 1 = Your Feed
    this.selectedTabIndex = isLoggedIn ? 1 : 0;
    if (this.pager) {
      this.pager.selectedIndex = this.selectedTabIndex;
    }
  }

  override selectTab(index: number) {
    this.selectedTabIndex = index;
    if (this.pager) {
      this.pager.selectedIndex = index;
    }
  }

  override onPagerIndexChanged(event: unknown) {
    const e = event as { value?: number; object?: { selectedIndex?: number } };
    const newIndex = e.value ?? e.object?.selectedIndex;
    if (newIndex !== undefined && newIndex !== this.selectedTabIndex) {
      this.selectedTabIndex = newIndex;
    }
  }

  override onPagerLoaded(args: LoadEventData) {
    if (this.pager) return;
    this.pager = args.object as Pager;
    
    // Set initial index based on auth state
    this.pager.selectedIndex = this.selectedTabIndex;

    this.pager.on('scroll', this.#scrollCallback);
  }

  ngOnDestroy() {
    if (this.pager) {
      this.pager.off('scroll', this.#scrollCallback);
    }
  }

  override onRefresh(args: { object: PullToRefresh }) {
    const pullRefresh = args.object;
    const currentTab = this.tabs[this.selectedTabIndex];
    
    console.log(`[Home] Refreshing ${currentTab.name}`);
    
    // Get the article list for the current tab and refresh it
    const articleListArray = this.articleLists?.toArray();
    if (articleListArray && articleListArray[this.selectedTabIndex]) {
      articleListArray[this.selectedTabIndex].refreshArticles();
    }
    
    // Stop the refreshing indicator after a short delay
    setTimeout(() => {
      pullRefresh.refreshing = false;
    }, 1000);
  }
}
