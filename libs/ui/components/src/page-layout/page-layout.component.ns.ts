import { ChangeDetectionStrategy, Component, inject, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

/**
 * NativeScript page layout with ActionBar and optional back navigation.
 * Provides consistent page chrome across the app.
 */
@Component({
  selector: 'cdt-page-layout',
  template: `
    <ActionBar [title]="title">
      @if (showBack) {
        <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
      }
    </ActionBar>
    <ScrollView>
      <ng-content></ng-content>
    </ScrollView>
  `,
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  @Input() title = '';
  @Input() showBack = true;

  goBack() {
    this.routerExtensions.back();
  }
}
