import { Button as NativeScriptButton, View as NativeScriptView } from "@nativescript/core";
import { Button as MasonButton } from "@triniwiz/nativescript-masonkit";

export function installButtonPatch(classes?: any[]) {
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

  if(!classes) {
    return;
  }
  
  for(const cls of classes) {
    if (cls && cls.prototype && typeof cls.prototype.on === 'function') {
      const originalOn = cls.prototype.on;
      cls.prototype.on = function(eventNames: string, callback: (args: any) => void, thisArg?: any) {
        const events = eventNames.split(' ');
        events.forEach((eventName: any) => {
          if (eventName === 'click') {
            console.log(`Click event mapped to tap event for ${cls.name}`);
            this.on('tap', callback, thisArg);
          } else {
            originalOn.call(this, eventName, callback, thisArg);
          }
        });
      };
    }
  }
}