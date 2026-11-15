---
title: "Choose a Delivery Strategy"
description: "Separate delivery-price selection from calculation using interchangeable JavaScript functions."
tags: ["Design patterns","JavaScript"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Separate delivery-price selection from calculation using interchangeable JavaScript functions.

<!--more-->

**Prerequisites** — Basic JavaScript and Node.js 22 or newer.

## Identify the changing rule

A parcel quote has several supported delivery methods. Each method takes the same parcel and returns a fee in cents. A strategy is a compatible operation that you can swap when a rule changes.

## Implement two strategies

Save this as `delivery.cjs`.

```js
const assert = require('node:assert/strict');
const pickup = () => 0;
const courier = ({ grams }) => 450 + Math.ceil(grams / 1000) * 120;

function quote(parcel, strategy) {
  if (!Number.isSafeInteger(parcel.grams) || parcel.grams < 1) {
    throw new Error('Invalid parcel weight');
  }
  return { grams: parcel.grams, delivery: strategy(parcel) };
}

const parcel = { grams: 1200 };
assert.equal(quote(parcel, pickup).delivery, 0);
assert.equal(quote(parcel, courier).delivery, 690);
```

Shared input validation runs before either fee calculation. The caller chooses a strategy. In a website, map a recognised delivery code to a trusted function on the server.

## Check boundaries

Run `node delivery.cjs`. Add assertions at 1000 g and 1001 g. The courier price should jump from 570 to 690 cents because the next kilogram band starts.

## Practice and check

Implement a bicycle strategy with a flat fee for up to 3000 g and a clear rejection above that. Add it without editing `quote`. Verify that the existing assertions pass and that an invalid weight is rejected before any strategy runs.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
