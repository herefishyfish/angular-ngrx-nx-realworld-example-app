import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Drawer } from '@nativescript-community/ui-drawer';
import { DrawerModule } from '@nativescript-community/ui-drawer/angular';
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthStore } from '@realworld/auth/data-access';
import { DrawerContentComponent } from './core/components/drawer-content/drawer-content.component';
import { DrawerService } from './core/services/drawer.service';

@Component({
  selector: 'cdt-root',
  templateUrl: './app.component.html',
  imports: [
    RouterModule,
    NativeScriptRouterModule,
    DrawerContentComponent,
    DrawerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent implements AfterViewInit {
  protected readonly authStore = inject(AuthStore);
  private readonly drawerService = inject(DrawerService);

  @ViewChild('drawer', { static: false }) drawerRef!: ElementRef<Drawer>;

  constructor() {
    this.authStore.getUser();
  }

  ngAfterViewInit() {
    if (this.drawerRef?.nativeElement) {
      this.drawerService.setDrawer(this.drawerRef.nativeElement);
    }
  }

  onDrawerLoaded(args: { object: Drawer }) {
    this.drawerService.setDrawer(args.object);
  }
}
