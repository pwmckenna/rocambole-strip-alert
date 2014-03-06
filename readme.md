# rocambole-strip-alert [![Build Status](https://travis-ci.org/sindresorhus/rocambole-strip-alert.png?branch=master)](https://travis-ci.org/sindresorhus/rocambole-strip-alert)

> Strip console statements from a [rocambole](https://github.com/millermedeiros/rocambole) AST


## Install

```
npm install --save rocambole-strip-alert
```


## Example

```js
var rocambole = require('rocambole');
var stripAlert = require('rocambole-strip-alert');

rocambole.moonwalk('if (true) { alert("foo"); }', function (node) {
	stripAlert(node);
}).toString();
//=> if (true) { void 0; }
```

To prevent any side-effects, `alert` is replaced with `void 0` instead of being removed.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
