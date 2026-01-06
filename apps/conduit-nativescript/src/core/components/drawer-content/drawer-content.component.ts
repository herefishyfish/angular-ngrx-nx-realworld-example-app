import { Component, ChangeDetectionStrategy, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule, RouterExtensions } from '@nativescript/angular';
import { DrawerService } from '../../services/drawer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cdt-drawer-content',
  template: `
    <StackLayout class="bg-white h-full w-2/3 lg:w-1/4">
      <StackLayout class="bg-[#5CB85C] pt-10 pb-5 px-5">
        <Label text="Conduit NativeScript" class="text-2xl font-bold text-white"></Label>
      </StackLayout>

      <div class="py-2 grid gap-2">
        <button class="py-3 px-5 text-base text-gray-800" (tap)="navigateTo('/home')">Home</button>

        <button class="py-3 px-5 text-base text-gray-800" (tap)="navigateTo('/login')">Sign In</button>

        <button class="py-3 px-5 text-base text-gray-800" (tap)="navigateTo('/register')">Sign Up</button>

        <button class="py-3 px-5 text-base text-gray-800 border-t border-gray-300 mt-2" (tap)="navigateTo('/settings')">Settings</button>
      </div>
    </StackLayout>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {
  private readonly drawerService = inject(DrawerService);
  private readonly routerExtensions = inject(RouterExtensions);
  private readonly router = inject(Router);

  navigateTo(path: string) {
    console.log('Navigating to', path); 
    this.drawerService.close();
    this.router.navigateByUrl(path);
    // this.routerExtensions.navigate([path], { clearHistory: false });
  }
}
