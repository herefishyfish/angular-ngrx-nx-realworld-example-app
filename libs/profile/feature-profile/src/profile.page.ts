import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileContentComponent } from './profile-content.component';

/**
 * Web page wrapper for ProfileContentComponent.
 */
@Component({
  selector: 'cdt-profile-page',
  template: `<cdt-profile-content />`,
  imports: [ProfileContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {}
