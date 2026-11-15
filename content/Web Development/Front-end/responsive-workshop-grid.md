---
title: "Build a Responsive Workshop Grid"
description: "Use CSS Grid to fit workshop cards to the space available, then verify narrow and wide layouts."
tags: ["CSS","responsive design"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use CSS Grid to fit workshop cards to the space available, then verify narrow and wide layouts.

<!--more-->

**Prerequisites** — Basic HTML and CSS and a browser with responsive design tools.

## Let the container decide

Save this as `index.html`. A minimum track width gives a card room for its content. `min(100%, 15rem)` lets that minimum shrink inside a container narrower than 15 rem.

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Workshop schedule</title>
<style>
  .schedule {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
    gap: 1rem;
    padding: 0;
    list-style: none;
  }
  .schedule li { border: 1px solid; padding: 1rem; overflow-wrap: anywhere; }
</style>
<main>
  <h1>Workshop schedule</h1>
  <ul class="schedule">
    <li><a href="#repair">Bike repair</a></li>
    <li><a href="#sewing">Basic sewing</a></li>
    <li><a href="#soldering">Intro to soldering</a></li>
  </ul>
  <h2 id="repair">Bike repair details</h2>
  <h2 id="sewing">Basic sewing details</h2>
  <h2 id="soldering">Intro to soldering details</h2>
</main>
</html>
```

## Inspect two layouts

Use the browser's responsive design tools at 320 and 1280 CSS pixels. Expect one column at 320 and three at 1280. Resize gradually to see where a second column fits. `auto-fit` collapses empty tracks so the remaining cards can occupy the available space.

## Verify reading order

Tab through the links at both widths. Links should be reached in the source order. Activate one and verify that it jumps to the corresponding heading. A reflow should preserve the association and sequence.

## Practice and check

Add a fourth workshop with a long unbroken name. Check three widths and 200% browser zoom. Verify that the long title wraps and no horizontal scrolling appears.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [CSS grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
