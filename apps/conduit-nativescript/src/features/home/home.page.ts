import { Component, ChangeDetectionStrategy, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { HomeComponentBase, HomeStore } from '@realworld/home/feature-home';
import { ActionBarComponent, NativeScriptCommonModule } from '@nativescript/angular';
import { ArticleListComponent } from '../article-list/article-list.component';
import { DrawerService } from '../../core/services/drawer.service';

@Component({
  selector: 'cdt-home',
  templateUrl: './home.page.html',
  imports: [NativeScriptCommonModule, ArticleListComponent, ActionBarComponent],
  providers: [HomeStore],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage extends HomeComponentBase {
  private readonly drawerService = inject(DrawerService);

  openDrawer() {
    this.drawerService.open();
  }
}
