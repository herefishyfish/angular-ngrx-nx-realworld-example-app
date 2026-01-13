import { ChangeDetectionStrategy, Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { ArticleEditFormComponent } from './article-edit-form.component';

/**
 * NativeScript page wrapper for ArticleEditFormComponent.
 * Includes ActionBar with navigation.
 */
@Component({
  selector: 'cdt-article-edit-page',
  template: `
    <ActionBar title="Editor">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" (tap)="goBack()"></NavigationButton>
    </ActionBar>
    <ScrollView>
      <cdt-article-edit-form />
    </ScrollView>
  `,
  imports: [ArticleEditFormComponent, NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditPageComponent {
  private readonly routerExtensions = inject(RouterExtensions);

  goBack() {
    this.routerExtensions.back();
  }
}
