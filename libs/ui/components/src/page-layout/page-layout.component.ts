import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Web page layout - minimal wrapper that just projects content.
 * The ActionBar concept doesn't apply to web.
 */
@Component({
  selector: 'cdt-page-layout',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  @Input() title = '';
  @Input() showBack = true;
}
