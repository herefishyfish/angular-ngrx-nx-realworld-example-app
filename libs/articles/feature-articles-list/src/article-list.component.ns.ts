import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ArticleListComponentBase } from './article-list.component.base';
import { ArticleListItemComponent } from './article-list-item/article-list-item.component';

@Component({
  selector: 'cdt-article-list',
  templateUrl: './article-list.component.html',
  imports: [NativeScriptCommonModule, ArticleListItemComponent],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent extends ArticleListComponentBase {}
