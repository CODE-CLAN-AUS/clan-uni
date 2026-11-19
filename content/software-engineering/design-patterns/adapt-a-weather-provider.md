---
title: "Adapt a Weather Provider"
description: "Translate an external record into your app's shape and test the boundary with local fixtures."
tags: ["Design patterns","adapters"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Translate an external record into your app's shape and test the boundary with local fixtures.

<!--more-->

**Prerequisites** — Node.js 22 or newer and familiarity with JavaScript objects.

## Define the internal contract

Your trail dashboard expects `{ station, celsius }`. One source sends `{ site_code, temp_f }`. Let the adapter own the external field names, units and validation so the rest of the app can work with a stable shape.

## Translate at the boundary

Save as `weather.cjs` and run `node weather.cjs`.

```js
const assert = require('node:assert/strict');

function fromFahrenheit(record) {
  if (typeof record.site_code !== 'string' ||
      record.site_code.trim() === '' ||
      !Number.isFinite(record.temp_f)) {
    throw new Error('Invalid Fahrenheit reading');
  }

  return {
    station: record.site_code,
    celsius: (record.temp_f - 32) * 5 / 9,
  };
}

assert.deepEqual(fromFahrenheit({ site_code: 'ridge', temp_f: 68 }), {
  station: 'ridge',
  celsius: 20,
});
assert.throws(() => fromFahrenheit({ site_code: 'ridge', temp_f: '68' }));
```

This adapter treats a numeric string as a contract error. If an upstream source officially sends strings, parse and validate them in that adapter. Keep rounding in the dashboard if it is only for display.

## Keep the consumer simple

Write a formatter that only reads `station` and `celsius`. Call it with the output of the adapter. You can now test both the translation and the formatted output without a network connection.

## Practice and check

Write an adapter for a second source that sends `{ id, temperatureC }`. Feed its result to the same formatter. Both sources should display the same result for 20 °C. Test missing fields and reject a malformed reading at its own boundary.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
- MDN contributors, [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
