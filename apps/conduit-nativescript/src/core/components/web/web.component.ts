import { Component } from '@angular/core';
import { isIOS, isAndroid } from '@nativescript/core';

@Component({
  selector: 'web',
  template: `@if (show) { 
    <ng-content></ng-content>
  }`,
  standalone: true,
})
export class WebFilterComponent {
  public show: boolean;

  constructor() {
    this.show = !isIOS && !isAndroid;
  }
}

@Component({
  selector: 'native',
  template: `@if (show) { 
    <ng-content></ng-content>
  }`,
  standalone: true,
})
export class NativeFilterComponent {
  public show: boolean;

  constructor() {
    this.show = isIOS || isAndroid;
  }
}