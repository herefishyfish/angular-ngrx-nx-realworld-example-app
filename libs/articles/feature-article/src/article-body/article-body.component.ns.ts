import { ChangeDetectionStrategy, Component, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: 'cdt-article-body',
  template: `
    <div class="mb-8" style="border-color: #e5e7eb; border-bottom-width: 2;">
      <span class="text-lg leading-7 mb-4">
        {{ body() }}
      </span>
    </div>
    <div style="height: 1; width: 100%; background-color: #e5e7eb; margin-bottom: 8;"></div>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBodyComponent {
  body = input.required<string>();
}
  