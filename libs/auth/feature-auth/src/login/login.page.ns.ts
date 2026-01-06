import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'cdt-login-page',
  template: `
    <ActionBar title="Sign In">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <cdt-login-form />
    </ScrollView>
  `,
  imports: [LoginFormComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  goBack() {
    this.routerExtensions.back();
  }
}
