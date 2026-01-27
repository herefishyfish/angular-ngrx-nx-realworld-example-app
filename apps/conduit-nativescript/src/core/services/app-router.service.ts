import { Injectable, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AppRouterService, AppNavigationOptions } from '@realworld/core/http-client';

/**
 * NativeScript implementation using RouterExtensions
 */
@Injectable()
export class NativeScriptAppRouterService implements AppRouterService {
  private readonly router = inject(RouterExtensions);

  navigate(commands: any[], options?: AppNavigationOptions): Promise<boolean> {
    console.log('[NativeScriptAppRouterService] navigate:', commands, options);
    return this.router.navigate(commands, {
      clearHistory: options?.clearHistory ?? false,
      animated: options?.animated ?? true,
    });
  }

  navigateByUrl(url: string, options?: AppNavigationOptions): Promise<boolean> {
    console.log('[NativeScriptAppRouterService] navigateByUrl:', url, options);
    return this.router.navigate([url], {
      clearHistory: options?.clearHistory ?? false,
      animated: options?.animated ?? true,
    });
  }

  back(): void {
    console.log('[NativeScriptAppRouterService] back');
    this.router.back();
  }
}
