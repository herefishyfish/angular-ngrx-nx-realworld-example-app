import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { RegisterFormComponent } from './register-form.component';

/**
 * NativeScript page wrapper for RegisterFormComponent.
 * Includes ActionBar with navigation and wraps the shared form component.
 */
@Component({
  selector: 'cdt-register-page',
  template: `
    <ActionBar title="Sign Up">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <cdt-register-form />
    </ScrollView>
  `,
  imports: [RegisterFormComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  goBack() {
    this.routerExtensions.back();
  }
}
