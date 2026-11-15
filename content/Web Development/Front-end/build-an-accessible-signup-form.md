---
title: "Build an Accessible Signup Form"
description: "Use native labels and validation to make a small HTML form easier to use with a keyboard."
tags: ["HTML","accessibility"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use native labels and validation to make a small HTML form easier to use with a keyboard.

<!--more-->

**Prerequisites** — A browser, a text editor and basic HTML.

## Give each control a visible label

Save this as `index.html` and open it. The `for` attribute matches the input ID. Clicking the label therefore focuses the input and assistive technology can discover its name.

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Tool library newsletter</title>
<h1>Tool library newsletter</h1>
<form>
  <label for="email">Email address (required)</label>
  <input id="email" name="email" type="email"
         autocomplete="email" aria-describedby="email-hint" required>
  <p id="email-hint">We send a monthly workshop schedule.</p>
  <button>Join newsletter</button>
  <p id="result" role="status"></p>
</form>
<script>
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#result').textContent = 'Signup preview complete.';
  });
</script>
</html>
```

## Trigger native validation

Try the form with an empty input, with `workshop` and with `workshop@example.test`. The first two should be blocked by the browser. The third triggers the local preview. The format check cannot establish that a mailbox exists.

## Check using a keyboard

Tab into the input, enter an address and reach the button with Tab. Press Enter. Ensure focus is visible and the result appears. A real service should validate the address again and confirm that the user controls it.

## Practice and check

Add an optional display-name field with a visible label and a 40-character limit. Make sure clicking each label focuses the correct control. Repeat the keyboard test at 200% zoom and write down any awkward interactions.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
- MDN contributors, [HTML label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/label) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
