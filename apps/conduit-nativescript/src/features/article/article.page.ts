import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ActionBarComponent, NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ArticleComponentBase } from '@realworld/articles/article/base';

@Component({
  selector: 'cdt-article',
  templateUrl: './article.page.html',
  imports: [NativeScriptCommonModule, ActionBarComponent, JsonPipe],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePage extends ArticleComponentBase {
  routerExtension = inject(RouterExtensions);
  
  goBack() {
    this.routerExtension.back();
  }
}
