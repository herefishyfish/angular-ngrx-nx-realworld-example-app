import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsFormComponent } from './settings-form.component';

/**
 * Web page wrapper for SettingsFormComponent.
 */
@Component({
  selector: 'cdt-settings-page',
  template: `<cdt-settings-form />`,
  imports: [SettingsFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
