import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ActionBarComponent, NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ArticleComponentBase } from './article.component.base';

@Component({
  selector: 'cdt-article',
  templateUrl: './article.component.html',
  imports: [NativeScriptCommonModule, ActionBarComponent, DatePipe],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent extends ArticleComponentBase {
  private readonly routerExtension = inject(RouterExtensions);

  goBack() {
    this.routerExtension.back();
  }
}
