import { Injectable, InjectionToken, inject } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

export interface AppNavigationOptions {
  clearHistory?: boolean;
  animated?: boolean;
  replaceUrl?: boolean;
}

export interface AppRouterService {
  navigate(commands: any[], options?: AppNavigationOptions): Promise<boolean>;
  navigateByUrl(url: string, options?: AppNavigationOptions): Promise<boolean>;
  back(): void;
}

export const APP_ROUTER_SERVICE = new InjectionToken<AppRouterService>('AppRouterService');

/**
 * Web implementation using Angular Router
 */
@Injectable({ providedIn: 'root' })
export class WebAppRouterService implements AppRouterService {
  private readonly router = inject(Router);

  navigate(commands: any[], options?: AppNavigationOptions): Promise<boolean> {
    const extras: NavigationExtras = {};
    if (options?.replaceUrl || options?.clearHistory) {
      extras.replaceUrl = true;
    }
    return this.router.navigate(commands, extras);
  }

  navigateByUrl(url: string, options?: AppNavigationOptions): Promise<boolean> {
    const extras: NavigationExtras = {};
    if (options?.replaceUrl || options?.clearHistory) {
      extras.replaceUrl = true;
    }
    return this.router.navigateByUrl(url, extras);
  }

  back(): void {
    window.history.back();
  }
}

/**
 * Default provider for web
 */
export const provideWebAppRouter = () => ({
  provide: APP_ROUTER_SERVICE,
  useClass: WebAppRouterService,
});
