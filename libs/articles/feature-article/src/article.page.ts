import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleComponent } from './article.component';

@Component({
  selector: 'cdt-article-page',
  template: `<cdt-article [slug]="slug" />`,
  imports: [ArticleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent {
  private readonly route = inject(ActivatedRoute);
  slug = this.route.snapshot.params['slug'];
}
