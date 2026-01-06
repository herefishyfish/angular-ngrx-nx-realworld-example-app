import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'cdt-login-page',
  template: `<cdt-login-form />`,
  imports: [LoginFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
