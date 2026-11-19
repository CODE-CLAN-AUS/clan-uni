---
title: "Price a Shopping Cart"
description: "Calculate a cart subtotal in integer cents and validate every line against a server-side catalogue."
tags: ["E-commerce","JavaScript"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Calculate a cart subtotal in integer cents and validate every line against a server-side catalogue.

<!--more-->

**Prerequisites** — Node.js 22 or newer and basic JavaScript.

## Decide what the browser may submit

The browser submits a SKU and quantity. The server supplies the current price and verifies that the quantity is allowed. Storing cents as integers avoids adding fractional binary floating-point amounts. This exercise uses AUD and small bounded values.

## Implement the subtotal

Save this as `cart.cjs` and run `node cart.cjs`.

```js
const prices = new Map([['mug', 1250], ['tea', 575]]);

function subtotal(lines) {
  let total = 0;
  for (const { sku, quantity } of lines) {
    if (!prices.has(sku) || !Number.isSafeInteger(quantity) ||
        quantity < 1 || quantity > 20) {
      throw new Error('Invalid cart line');
    }
    total += prices.get(sku) * quantity;
    if (!Number.isSafeInteger(total)) {
      throw new Error('Cart total out of range');
    }
  }
  return total;
}

console.log(subtotal([{ sku: 'mug', quantity: 2 }, { sku: 'tea', quantity: 1 }]));
```

The expected subtotal is 3075 cents. A submitted price field has no effect because the calculation reads from the catalogue.

## Define a rounding rule

For a practice discount of 10% on the subtotal, round the discount once at the cart level. For this fixture 307.5 cents rounds to 308, leaving 2767 cents. When a system uses line-level rounding, the sum can differ by a cent. Keep the rule explicit.

## Practice and check

Write assertions for an empty cart, an unknown SKU and a fractional quantity. Decide whether duplicate SKUs are accepted. If your 20-item limit applies per SKU, aggregate quantities before enforcing it. A cart containing two mug lines of 15 should then fail.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Number.isSafeInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
