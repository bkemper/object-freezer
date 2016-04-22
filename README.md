# Object Freezer

The purpose of this module is to [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) an object and all its nested objects.  What differentiates this project from others, such as [deep-freeze](https://github.com/substack/deep-freeze) and [deep-freeze-strict](https://github.com/jsdf/deep-freeze), is the ability to flag specific nested objects as antifreeze to avoid freezing.

## Disclaimer

This is not a new idea or a common need.  The project originated from a single very specific use case.  Your chances of needing this module are slim.

## Installation

```bash
npm install object-freezer --save
```

## Use Strict

[Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) is the method used to freeze the objects.  It is highly recommended to use [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).  With strict mode, frozen objects will throw an TypeError on a change attempt.  Without strict mode, frozen objects silently ignore changes.

## Examples

The following is a basic example of how to `deepFreeze` an object and what happens when changes are attempted.

```js
'use strict';
import { deepFreeze } from 'object-freezer';

const frozen = deepFreeze({
  int: 2016,
  str: 'example',
  arr: [ 1, 2, 3 ],
  obj: { a: 1, b: 2, c: 3 },
});

frozen.int = 2017;     // throws a TypeError
frozen.str = 'sample'; // throws a TypeError
frozen.arr = [ 1 ];    // throws a TypeError
frozen.obj = {};       // throws a TypeError
```

The following is an example of how to `antiFreeze` nested objects to avoid a `deepFreeze`.

```js
'use strict';
import { antiFreeze, deepFreeze } from 'object-freezer';

const frozen = deepFreeze({
  obj: antiFreeze({ a: 1, b: 2, c: 3 }),
});

frozen.obj = {}; // success!
```