import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ArticleComponent } from './article.component';

@Component({
  selector: 'cdt-article-page',
  template: `
    <ActionBar title="Article">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <cdt-article [slug]="slug" [native]="true" />
    </ScrollView>
  `,
  imports: [ArticleComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent {
  private readonly routerExtensions = inject(RouterExtensions);
  private readonly route = inject(ActivatedRoute);
  slug = this.route.snapshot.params['slug'];

  constructor() {
    console.log('ArticlePageComponent initialized with slug:', this.slug);
  }

  goBack() {
    this.routerExtensions.back();
  }
}
