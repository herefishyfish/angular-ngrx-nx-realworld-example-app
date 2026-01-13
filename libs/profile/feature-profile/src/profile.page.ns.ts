import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ProfileContentComponent } from './profile-content.component';

/**
 * NativeScript page wrapper for ProfileContentComponent.
 * Includes ActionBar with navigation.
 */
@Component({
  selector: 'cdt-profile-page',
  template: `
    <ActionBar title="Profile">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <cdt-profile-content />
    </ScrollView>
  `,
  imports: [ProfileContentComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  goBack() {
    this.routerExtensions.back();
  }
}
