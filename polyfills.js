// Polyfills for web APIs not available in React Native
// Must be loaded before any other code

(function() {
  'use strict';
  
  // DOMRect and DOMRectReadOnly polyfill
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
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left
      };
    }
  }

  class DOMRect extends DOMRectReadOnly {
    constructor(x, y, width, height) {
      super(x, y, width, height);
    }
  }

  // Helper function to safely define property
  function defineGlobalProperty(obj, name, value) {
    try {
      if (obj && typeof obj === 'object') {
        Object.defineProperty(obj, name, {
          value: value,
          writable: true,
          enumerable: false,
          configurable: true
        });
      }
    } catch (e) {
      // Fallback if defineProperty fails
      if (obj) {
        obj[name] = value;
      }
    }
  }

  // Set on all possible global objects
  defineGlobalProperty(global, 'DOMRect', DOMRect);
  defineGlobalProperty(global, 'DOMRectReadOnly', DOMRectReadOnly);

  if (typeof globalThis !== 'undefined') {
    defineGlobalProperty(globalThis, 'DOMRect', DOMRect);
    defineGlobalProperty(globalThis, 'DOMRectReadOnly', DOMRectReadOnly);
  }

  if (typeof window !== 'undefined') {
    defineGlobalProperty(window, 'DOMRect', DOMRect);
    defineGlobalProperty(window, 'DOMRectReadOnly', DOMRectReadOnly);
  }

  if (typeof self !== 'undefined') {
    defineGlobalProperty(self, 'DOMRect', DOMRect);
    defineGlobalProperty(self, 'DOMRectReadOnly', DOMRectReadOnly);
  }

  // setImmediate polyfill
  if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = function(callback, ...args) {
      return setTimeout(callback, 0, ...args);
    };
  }

  if (typeof global.clearImmediate === 'undefined') {
    global.clearImmediate = function(id) {
      clearTimeout(id);
    };
  }
})();
