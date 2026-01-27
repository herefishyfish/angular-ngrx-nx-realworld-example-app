import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '@nativescript/core';

@Pipe({ name: 'colorTransition', standalone: true })
export class ColorTransitionPipe implements PipeTransform {
  private toColor: Color | null = null;
  private fromColor: Color | null = null;
  private lastFrom = '';
  private lastTo = '';

  private lerp(a: number, b: number, value: number): number {
    return a + (b - a) * value;
  }

  private setColors(from: string, to: string): void {
    if (from !== this.lastFrom) {
      this.fromColor = new Color(from);
      this.lastFrom = from;
    }
    if (to !== this.lastTo) {
      this.toColor = new Color(to);
      this.lastTo = to;
    }
  }

  transform(pagerPosition: number, index: number, from: string, to: string): string {
    const diff = Math.abs(pagerPosition - index);

    if (diff >= 1) {
      return to;
    }
    if (diff === 0) {
      return from;
    }

    this.setColors(from, to);
    
    if (!this.fromColor || !this.toColor) {
      return from;
    }

    const r = Math.round(this.lerp(this.fromColor.r, this.toColor.r, diff));
    const g = Math.round(this.lerp(this.fromColor.g, this.toColor.g, diff));
    const b = Math.round(this.lerp(this.fromColor.b, this.toColor.b, diff));

    return `rgb(${r},${g},${b})`;
  }
}
