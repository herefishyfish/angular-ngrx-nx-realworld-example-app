import { Component, ElementRef, inject } from '@angular/core';

declare const __ANDROID__: boolean | undefined;
declare const __IOS__: boolean | undefined;

@Component({
  selector: 'cdt-web, cdt-native',
  template: `@if (show) { 
    <ng-content></ng-content>
  }`,
  standalone: true,
})
export class PlatformFilterComponent {
  public show: boolean;
  private readonly elementRef = inject(ElementRef);

  constructor() {
    const tagName = this.elementRef.nativeElement?.tagName?.toLowerCase() ?? '';
    const isNative = tagName === 'cdt-native';
    const isNativePlatform =
      (typeof __ANDROID__ !== 'undefined' && !!__ANDROID__) ||
      (typeof __IOS__ !== 'undefined' && !!__IOS__);
    
    this.show = isNative ? isNativePlatform : !isNativePlatform;
  }
}
