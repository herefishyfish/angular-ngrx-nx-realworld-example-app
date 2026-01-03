import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ActionBarComponent, NativeScriptCommonModule } from '@nativescript/angular';
import { HomeComponentBase } from './home.component.base';
import { HomeStore } from './home.store';
import { ArticleListComponent } from '@realworld/articles/articles-list';
import { DRAWER_SERVICE } from './drawer.service';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.component.html',
  imports: [NativeScriptCommonModule, ArticleListComponent, ActionBarComponent],
  providers: [HomeStore],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends HomeComponentBase {
  private readonly drawerService = inject(DRAWER_SERVICE, { optional: true });

  override openDrawer() {
    this.drawerService?.open();
  }
}
