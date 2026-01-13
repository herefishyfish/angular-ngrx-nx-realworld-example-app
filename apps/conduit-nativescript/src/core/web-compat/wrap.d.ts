import { View as NSView } from '@nativescript/core';

export interface MasonViewOptions {
  /**
   * When true, the view is treated as a leaf node in the layout tree.
   * Leaf nodes don't participate in mason's child layout - their children
   * are managed by the wrapped view itself.
   * @default true
   */
  leaf?: boolean;
}

interface MasonViewConstructor<T extends NSView> {
  new (...args: any[]): T;
}

/**
 * A view wrapped with Mason layout support
 */
export type MasonWrappedView<T extends any> = T & {
  /**
   * The underlying Mason node for advanced layout manipulation
   */
  readonly masonNode: any;
};

/**
 * Creates a Mason-compatible wrapper for any NativeScript view.
 * This allows third-party views (like @nativescript/google-maps) to be
 * used within MasonKit layouts and participate in the layout system.
 *
 * @example
 * ```typescript
 * import { MapView } from '@nativescript/google-maps';
 * import { createMasonView } from '@nativescript/nativescript-masonkit';
 * import { registerElement } from '@nativescript/angular';
 *
 * // Create a Mason-compatible wrapper for MapView
 * const MasonMapView = createMasonView(MapView, { leaf: true });
 *
 * // Register for use in templates
 * registerElement('MasonMapView', () => MasonMapView);
 * ```
 *
 * @example
 * ```xml
 * <!-- Use in your template -->
 * <div style="display: flex; flex-direction: column;">
 *   <p>Map Below:</p>
 *   <MasonMapView style="width: 100%; height: 300px;"></MasonMapView>
 * </div>
 * ```
 *
 * @param ViewClass - The NativeScript view class to wrap
 * @param options - Configuration options for the mason wrapper
 * @param options.leaf - When true (default), the view is treated as a leaf node.
 *                       Leaf nodes don't manage their children through Mason's layout system.
 *                       Set to false if the wrapped view should also manage Mason child layouts.
 * @returns A new class that extends the original view with mason layout support
 */
export function createMasonView<T extends NSView>(
  ViewClass: MasonViewConstructor<T>,
  options?: MasonViewOptions
): MasonViewConstructor<MasonWrappedView<T>>;
