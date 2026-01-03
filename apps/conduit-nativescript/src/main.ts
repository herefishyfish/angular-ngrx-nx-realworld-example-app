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
import { API_URL } from '@realworld/core/http-client/src';
import { DRAWER_SERVICE } from '@realworld/home/feature-home';
import { DrawerService } from './core/services/drawer.service';


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
import { Button, View } from '@triniwiz/nativescript-masonkit';
registerElement('button', () => Button);

@CSSType('a')
class Anchor extends View {}
registerElement('a', () => Anchor);

/**
 * Install UI Drawer gestures
 */
import { install as installDrawer } from '@nativescript-community/ui-drawer';
installDrawer();

import { installButtonPatch } from './core/web/button';
installButtonPatch([Anchor]);

import { TextField } from '@nativescript/core';
registerElement('input', () => TextField);

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
      ],
    });
  },
});
