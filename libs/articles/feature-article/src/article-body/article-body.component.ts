import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarkdownPipe } from '../pipes/markdown.pipe';

@Component({
  selector: 'cdt-article-body',
  template: `
    <div data-testid="article-body" class="text-lg leading-7 mb-4" [innerHTML]="body() | markdown"></div>
  `,
  imports: [MarkdownPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBodyComponent {
  body = input.required<string>();
}
