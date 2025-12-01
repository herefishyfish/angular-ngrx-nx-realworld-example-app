import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptNgZone,
  provideNativeScriptRouter,
  registerElement,
  runNativeScriptAngularApp,
} from '@nativescript/angular';
import { provideZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { environment } from './environments/environment.prod';
import { API_URL } from '@realworld/core/http-client/src';


/**
 * Register MasonKit Web components
 */
import * as MasonKitWeb from "@triniwiz/nativescript-masonkit/web";
Object.values(MasonKitWeb).forEach((component: any) => {
  if (typeof component === "function") {
    registerElement(
      component.prototype.constructor.name.toLowerCase(),
      () => component
    );
  }
});

import { installButtonPatch } from './core/web/button';
installButtonPatch();

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
      ],
    });
  },
});
