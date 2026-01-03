import { Component, ChangeDetectionStrategy, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'cdt-drawer-content',
  template: `
    <div class="bg-white h-full w-2/3 lg:w-1/4">
      <div class="bg-[#5CB85C] pt-10 pb-5 px-5">
        <h1 class="text-2xl font-bold text-white">Conduit NativeScript</h1>
      </div>

      <div class="py-2">
        <div class="py-3 px-5" (tap)="navigateTo('/home')">
          <span class="text-base text-gray-800">Home</span>
        </div>

        <div class="py-3 px-5" (tap)="navigateTo('/login')">
          <span class="text-base text-gray-800">Sign In</span>
        </div>

        <div class="py-3 px-5" (tap)="navigateTo('/register')">
          <span class="text-base text-gray-800">Sign Up</span>
        </div>

        <div class="py-3 px-5 border-t border-gray-300 mt-2" (tap)="navigateTo('/settings')">
          <span class="text-base text-gray-800">Settings</span>
        </div>
      </div>
    </div>
  `,
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
