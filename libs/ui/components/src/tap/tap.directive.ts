import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

/**
 * Directive that forwards (tap) events to (click) for web compatibility.
 * This allows NativeScript templates using (tap) to work on web without modification.
 */
@Directive({
  selector: '[tap]',
  standalone: true,
})
export class TapDirective {
  @Output() tap = new EventEmitter<Event>();

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.tap.emit(event);
  }
}
