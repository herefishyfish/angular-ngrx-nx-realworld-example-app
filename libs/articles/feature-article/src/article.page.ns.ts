import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ArticleComponent } from './article.component';
import { ArticleStore } from '@realworld/articles/data-access';
import { registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';

registerElement('PullToRefresh', () => PullToRefresh);

@Component({
  selector: 'cdt-article-page',
  template: `
    <ActionBar title="Article">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <PullToRefresh (refresh)="onRefresh($event)">
      <ScrollView>

        <cdt-article [slug]="slug" [native]="true" />
      </ScrollView>
    </PullToRefresh>
  `,
  imports: [ArticleComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent {
  private readonly routerExtensions = inject(RouterExtensions);
  private readonly route = inject(ActivatedRoute);
  private readonly articleStore = inject(ArticleStore);
  slug = this.route.snapshot.params['slug'];

  constructor() {
    console.log('ArticlePageComponent initialized with slug:', this.slug);
  }

  goBack() {
    this.routerExtensions.back();
  }

  onRefresh(args: { object: PullToRefresh }) {
    const pullToRefresh = args.object;
    
    this.articleStore.getArticle(this.slug);
    this.articleStore.getComments(this.slug);
    
    setTimeout(() => {
      pullToRefresh.refreshing = false;
    }, 1000);
  }
}
