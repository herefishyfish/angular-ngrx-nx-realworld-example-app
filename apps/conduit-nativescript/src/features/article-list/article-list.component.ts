import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleListComponentBase, ArticleListItemComponent } from '@realworld/articles/articles-list';
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: 'cdt-article-list',
  templateUrl: './article-list.component.html',
  imports: [NativeScriptCommonModule, ArticleListItemComponent],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends ArticleListComponentBase {}
