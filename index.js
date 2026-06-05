// Polyfills MUST be defined before any imports
if (typeof global.DOMRect === 'undefined') {
  class DOMRectReadOnly {
    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.top = y;
      this.right = x + width;
      this.bottom = y + height;
      this.left = x;
    }
    toJSON() {
      return {
        x: this.x, y: this.y, width: this.width, height: this.height,
        top: this.top, right: this.right, bottom: this.bottom, left: this.left
      };
    }
  }
  
  class DOMRect extends DOMRectReadOnly {
    constructor(x, y, width, height) {
      super(x, y, width, height);
    }
  }
  
  global.DOMRect = DOMRect;
  global.DOMRectReadOnly = DOMRectReadOnly;
  if (typeof globalThis !== 'undefined') {
    globalThis.DOMRect = DOMRect;
    globalThis.DOMRectReadOnly = DOMRectReadOnly;
  }
}

// Load the app
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
