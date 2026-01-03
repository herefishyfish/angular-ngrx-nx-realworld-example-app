import { Injectable } from '@angular/core';
import { Drawer } from '@nativescript-community/ui-drawer';
import { DrawerServiceAbstract } from '@realworld/home/feature-home';

@Injectable({ providedIn: 'root' })
export class DrawerService implements DrawerServiceAbstract {
  private drawerRef: Drawer | null = null;

  setDrawer(drawer: Drawer) {
    this.drawerRef = drawer;
  }

  open() {
    this.drawerRef?.open('left');
  }

  close() {
    this.drawerRef?.close('left');
  }

  toggle() {
    this.drawerRef?.toggle('left');
  }
}
