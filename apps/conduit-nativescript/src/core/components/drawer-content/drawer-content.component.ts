import { Component, ChangeDetectionStrategy, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'cdt-drawer-content',
  template: `
    <div class="drawer-container">
      <div class="header">
        <span class="title">Conduit</span>
      </div>

      <div class="nav-section">
        <div class="nav-item" (tap)="navigateTo('/home')">
          <span class="nav-text">Home</span>
        </div>

        <div class="nav-item" (tap)="navigateTo('/login')">
          <span class="nav-text">Sign In</span>
        </div>

        <div class="nav-item" (tap)="navigateTo('/register')">
          <span class="nav-text">Sign Up</span>
        </div>

        <div class="nav-item" (tap)="navigateTo('/settings')">
          <span class="nav-text">Settings</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .drawer-container {
      background-color: #ffffff;
      height: 100%;
      width: 100%;
    }

    .header {
      background-color: #5cb85c;
      padding: 40 20 20 20;
    }

    .title {
      font-size: 24;
      font-weight: bold;
      color: #ffffff;
    }

    .nav-section {
      padding: 8 0;
    }

    .nav-item {
      padding: 14 20;
    }

    .nav-text {
      font-size: 16;
      color: #333333;
    }
  `],
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {
  private readonly drawerService = inject(DrawerService);
  private readonly routerExtensions = inject(RouterExtensions);

  navigateTo(path: string) {
    this.drawerService.close();
    this.routerExtensions.navigate([path], { clearHistory: false });
  }
}
