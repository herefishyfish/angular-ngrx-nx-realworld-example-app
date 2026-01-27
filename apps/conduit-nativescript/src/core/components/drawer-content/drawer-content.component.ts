import { Component, ChangeDetectionStrategy, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { DrawerService } from '../../services/drawer.service';
import { AuthStore } from '@realworld/auth/data-access';
import { APP_ROUTER_SERVICE } from '@realworld/core/http-client';

@Component({
  selector: 'cdt-drawer-content',
  template: `
    <StackLayout class="bg-white h-full w-2/3 lg:w-1/4">
      <StackLayout class="bg-[#5CB85C] pt-10 pb-5 px-5">
        <Label text="Conduit NativeScript" class="text-2xl font-bold text-white"></Label>
        @if (authStore.loggedIn()) {
          <Label [text]="'@' + authStore.user().username" class="text-sm text-white/80 mt-1"></Label>
        }
      </StackLayout>

      <div class="py-2 grid gap-2 w-full">
        <button class="w-full py-3 px-5 text-base text-gray-800" (tap)="navigateToHome()">Home</button>

        @if (!authStore.loggedIn()) {
          <button class="w-full py-3 px-5 text-base text-gray-800" (tap)="navigateTo('/login')">Sign In</button>
          <button class="w-full py-3 px-5 text-base text-gray-800" (tap)="navigateTo('/register')">Sign Up</button>
        }

        @if (authStore.loggedIn()) {
          <button class="w-full py-3 px-5 text-base text-gray-800 border-t border-gray-300 mt-2" (tap)="navigateTo('/settings')">Settings</button>
          <button class="w-full py-3 px-5 text-base text-gray-800" (tap)="navigateToProfile()">Your Profile</button>
        }
      </div>
    </StackLayout>
  `,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {
  protected readonly authStore = inject(AuthStore);
  private readonly drawerService = inject(DrawerService);
  private readonly router = inject(APP_ROUTER_SERVICE);

  navigateToHome() {
    console.log('Navigating to home with clearHistory');
    this.drawerService.close();
    this.router.navigateByUrl('/home', { clearHistory: true });
  }

  navigateTo(path: string) {
    console.log('Navigating to', path); 
    this.drawerService.close();
    this.router.navigateByUrl(path);
  }

  navigateToProfile() {
    const username = this.authStore.user().username;
    console.log('Navigating to profile for', username);
    this.drawerService.close();
    this.router.navigateByUrl(`/profile/${username}`);
  }
}
