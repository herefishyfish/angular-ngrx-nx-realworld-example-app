import { Injectable } from '@angular/core';
import { Drawer } from '@nativescript-community/ui-drawer';

@Injectable({ providedIn: 'root' })
export class DrawerService {
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
