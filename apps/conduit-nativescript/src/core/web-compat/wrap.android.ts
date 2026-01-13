// @ts-ignore-file
import { View as NSView } from '@nativescript/core';
import { Style } from '../../../node_modules/@triniwiz/nativescript-masonkit/style';
import { isMasonView_, native_, style_ } from '../../../node_modules/@triniwiz/nativescript-masonkit/symbols';

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

type MasonWrappedView<T extends NSView> = T & {
  [isMasonView_]: boolean;
  //@ts-ignore
  [native_]: org.nativescript.mason.masonkit.Node;
  [style_]: Style;
  _styleHelper: Style;
  //@ts-ignore
  _masonNode: org.nativescript.mason.masonkit.Node;
};

/**
 * Creates a Mason-compatible wrapper for any NativeScript view.
 * This allows third-party views (like @nativescript/google-maps) to be
 * used within MasonKit layouts and participate in the layout system.
 * 
 * Note: For simple use cases where you just need layout, you can often
 * use the view directly without wrapping - Mason automatically handles
 * non-Mason views added to its containers. The wrapper is useful when you
 * need to apply Mason CSS styles to the wrapped view.
 *
 * @example
 * ```typescript
 * import { MapView } from '@nativescript/google-maps';
 * import { createMasonView } from '@nativescript/nativescript-masonkit/wrapper';
 *
 * const MasonMapView = createMasonView(MapView, { leaf: true });
 * registerElement('MasonMapView', () => MasonMapView);
 * ```
 *
 * @param ViewClass - The NativeScript view class to wrap
 * @param options - Configuration options for the mason wrapper
 * @returns A new class that extends the original view with mason layout support
 */
export function createMasonView<T extends NSView>(
  ViewClass: MasonViewConstructor<T>,
  options: MasonViewOptions = {}
  // @ts-ignore
): MasonViewConstructor<MasonWrappedView<T>> {
  const { leaf = true } = options;
  
  class MasonWrappedViewClass extends (ViewClass as MasonViewConstructor<NSView>) {
    // Mark as a mason view so the parent knows to use mason layout
    [isMasonView_] = true;
    //@ts-ignore
    [native_]: org.nativescript.mason.masonkit.Node;
    // @ts-ignore
    [style_]: Style;
    private _nodeInitialized = false;

    constructor(...args: any[]) {
      super(...args);
    }

    /**
     * Lazily get/create the mason node after the view has been added to the native tree.
     * Mason's View.addView already creates nodes for non-Element views, so we retrieve
     * the same cached node.
     */
    //@ts-ignore
    get _masonNode(): org.nativescript.mason.masonkit.Node {
      if (!this._nodeInitialized && this.nativeViewProtected) {
        //@ts-ignore
        const mason = org.nativescript.mason.masonkit.Mason.getShared();
        // This will return the existing node if one was created by the parent's addView
        this[native_] = mason.nodeForView(this.nativeViewProtected as android.view.View);
        this._nodeInitialized = true;
      }
      return this[native_];
    }

    get _styleHelper(): Style {
      const node = this._masonNode;
      if (this[style_] === undefined && node) {
        this[style_] = Style.fromView(this as never, node);
      }
      return this[style_];
    }

    disposeNativeView() {
      this[native_] = null;
      //@ts-ignore
      this[style_] = null;
      this._nodeInitialized = false;
      super.disposeNativeView();
    }

    // Override to handle mason parent attachment for non-leaf views
    // @ts-ignore
    public _addViewToNativeVisualTree(child: NSView, atIndex = -1): boolean {
      const result = super._addViewToNativeVisualTree(child, atIndex);
      
      // If not a leaf, we need to add children to the mason tree
      // @ts-ignore
      if (!leaf && result && child[isMasonView_] && this._masonNode) {
        //@ts-ignore
        const mason = org.nativescript.mason.masonkit.Mason.getShared();
        const childNode = mason.nodeForView(child.nativeViewProtected as android.view.View);
        if (childNode && childNode.getParent() !== this._masonNode) {
          if (atIndex === -1) {
            this._masonNode.appendChild(childNode);
          } else {
            this._masonNode.addChildAt(childNode, atIndex);
          }
        }
      }
      return result;
    }

    // @ts-ignore
    public _removeViewFromNativeVisualTree(child: NSView): void {
      // @ts-ignore
      if (!leaf && child[isMasonView_] && child.nativeViewProtected && this._masonNode) {
        // @ts-ignore
        const mason = org.nativescript.mason.masonkit.Mason.getShared();
        const childNode = mason.nodeForView(child.nativeViewProtected as android.view.View);
        if (childNode) {
          this._masonNode.removeChild(childNode);
        }
      }
      super._removeViewFromNativeVisualTree(child);
    }

    // Provide access to mason node for advanced usage
    //@ts-ignore
    get masonNode(): org.nativescript.mason.masonkit.Node {
      return this._masonNode;
    }
  }

  // Preserve the original class name for debugging
  Object.defineProperty(MasonWrappedViewClass, 'name', {
    value: `Mason${ViewClass.name}`,
    writable: false,
  });

  return MasonWrappedViewClass as unknown as MasonViewConstructor<MasonWrappedView<T>>;
}

