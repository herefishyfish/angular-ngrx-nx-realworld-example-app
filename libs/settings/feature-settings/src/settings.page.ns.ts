import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { SettingsFormComponent } from './settings-form.component';

/**
 * NativeScript page wrapper for SettingsFormComponent.
 * Includes ActionBar with navigation.
 */
@Component({
  selector: 'cdt-settings-page',
  template: `
    <ActionBar title="Settings">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <cdt-settings-form />
    </ScrollView>
  `,
  imports: [SettingsFormComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  goBack() {
    this.routerExtensions.back();
  }
}
