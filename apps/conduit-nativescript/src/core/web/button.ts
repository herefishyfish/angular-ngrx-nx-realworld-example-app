import { Button as NativeScriptButton, View as NativeScriptView } from "@nativescript/core";
import { Button as MasonButton } from "@triniwiz/nativescript-masonkit";

export function installButtonPatch() {
  NativeScriptButton.prototype.on = function(eventNames: string, callback: (args: any) => void, thisArg?: any) {
    const events = eventNames.split(' ');
    events.forEach((eventName: any) => {
      if (eventName === 'click') {
        console.log('Click event mapped to tap event');
        this.on('tap', callback, thisArg);
      } else {
        NativeScriptView.prototype.on.call(this, eventName, callback, thisArg);
      }
    });
  };
  // MasonButton.prototype.on = function(eventNames: string, callback: (args: any) => void, thisArg?: any) {
  //   const events = eventNames.split(' ');
  //   events.forEach((eventName: any) => {
  //     if (eventName === 'click') {
  //       console.log('Click event mapped to tap event');
  //       this.on('tap', callback, thisArg);
  //     } else {
  //       MasonButton.prototype.on.call(this, eventName, callback, thisArg);
  //     }
  //   });
  // };
}