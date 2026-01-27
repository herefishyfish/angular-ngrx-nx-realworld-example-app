import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptNgZone,
  provideNativeScriptRouter,
  registerElement,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { CSSType } from '@nativescript/core';
import { provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { environment } from './environments/environment.prod';
import { API_URL, APP_ROUTER_SERVICE } from '@realworld/core/http-client/src';
import { DRAWER_SERVICE } from '@realworld/home/feature-home';
import { DrawerService } from './core/services/drawer.service';
import { AUTH_STORAGE_SERVICE } from '@realworld/auth/data-access';
import { NativeScriptAuthStorageService } from './core/services/auth-storage.service';
import { NativeScriptAppRouterService } from './core/services/app-router.service';


/**
 * Register MasonKit Web components
 */
import * as MasonKitWeb from "@triniwiz/nativescript-masonkit/web";
Object.values(MasonKitWeb).forEach((component: any) => {
  if (typeof component === "function") {
    console.log("Registering MasonKit Web component:", component.prototype.constructor.name);
    registerElement(
      component.prototype.constructor.name.toLowerCase(),
      () => component
    );
  }
});
import { Button, View, Input } from '@triniwiz/nativescript-masonkit';
registerElement('button', () => Button);
registerElement('input', () => Input);
@CSSType('a')
class Anchor extends View {}
registerElement('a', () => Anchor);

@CSSType('form')
class Form extends View {}
registerElement('form', () => Form);

/**
 * Install UI Drawer gestures
 */
import { install as installDrawer } from '@nativescript-community/ui-drawer';
installDrawer();

import { Pager, PagerItem } from '@nativescript-community/ui-pager';
registerElement('Pager', () => Pager);
registerElement('PagerItem', () => PagerItem);

/**
 * Install UI PullToRefresh
 */
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
registerElement('PullToRefresh', () => PullToRefresh);

import { installButtonPatch } from './core/web-compat/button';
installButtonPatch([Anchor]);

/**
 * Disable zone by setting this to true
 * Then also adjust polyfills.ts (see note there)
 */
const EXPERIMENTAL_ZONELESS = false;

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        EXPERIMENTAL_ZONELESS ? provideZonelessChangeDetection() : provideNativeScriptNgZone(),
        { provide: API_URL, useValue: environment.api_url },
        { provide: DRAWER_SERVICE, useExisting: DrawerService },
        { provide: AUTH_STORAGE_SERVICE, useClass: NativeScriptAuthStorageService },
        { provide: APP_ROUTER_SERVICE, useClass: NativeScriptAppRouterService },
      ],
    });
  },
});
