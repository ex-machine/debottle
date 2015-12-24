# debottle

JS debounce/throttle portmanteau, now with callback taste.

Supports error-first Node.js-styled callbacks.

## Install

### NPM

    npm install --save ng-debottle

### Bower

    bower install --save ng-debottle

## Usage

```javascript
var debounce = require('debottle').debounce;
var throttle = require('debottle').throttle;

function fn() { ... }
function optionalCallback(err, data) { ... }

var throttledFn = throttle(fn, null, optionalCallback);
var debouncedFn = debounce(fn, 100, optionalCallback);

throttledFn();
throttledFn();
...

debouncedFn();
debouncedFn();
...
```

