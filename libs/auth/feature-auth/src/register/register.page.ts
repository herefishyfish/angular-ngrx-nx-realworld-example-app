import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFormComponent } from './register-form.component';

@Component({
  selector: 'cdt-register-page',
  template: `<cdt-register-form />`,
  imports: [RegisterFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
