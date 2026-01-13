import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleEditFormComponent } from './article-edit-form.component';

/**
 * Web page wrapper for ArticleEditFormComponent.
 */
@Component({
  selector: 'cdt-article-edit-page',
  template: `<cdt-article-edit-form />`,
  imports: [ArticleEditFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditPageComponent {}
