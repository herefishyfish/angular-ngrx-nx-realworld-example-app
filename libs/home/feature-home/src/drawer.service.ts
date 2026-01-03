import { InjectionToken } from '@angular/core';

export interface DrawerServiceAbstract {
  open(): void;
  close(): void;
  toggle(): void;
}

export const DRAWER_SERVICE = new InjectionToken<DrawerServiceAbstract>('DrawerService');
