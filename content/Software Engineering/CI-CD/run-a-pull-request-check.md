---
title: "Run a Pull Request Check"
description: "Use GitHub Actions to run a small test suite and check that it catches a regression."
tags: ["CI","GitHub Actions"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use GitHub Actions to run a small test suite and check that it catches a regression.

<!--more-->

**Prerequisites** — Node.js 22, GitHub and a disposable repository with Actions enabled.

## Start with a test that runs anywhere

Save `fee.test.cjs` in the repository root.

```js
const test = require('node:test');
const assert = require('node:assert/strict');

const bookingFee = (tickets) => tickets >= 4 ? 0 : 250;

test('groups of four pay no booking fee', () => {
  assert.equal(bookingFee(3), 250);
  assert.equal(bookingFee(4), 0);
});
```

Run `node --test` locally. The boundary assertion distinguishes four tickets from three.

## Run the same command in CI

Create `.github/workflows/check.yml`. The workflow uses a hosted Linux runner and the built-in test runner. It needs read access to repository contents.

```yaml
name: Check booking fee
on:
  pull_request:
  workflow_dispatch:
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: node --test
```

## Observe both outcomes

Commit the baseline and workflow to the default branch of the disposable repository. Open a test PR that changes `>=` to `>`. Check the job log and locate the failed assertion. Push the corrected expression and verify that the new run passes.

## Practice and check

Add an assertion for five tickets. Explain which assertion catches the exact boundary regression. Move the fee into a separate module and run the same test command both locally and in Actions.

## Sources

Original lesson text and examples. The following references informed this course.

- GitHub Docs contributors, [GitHub Actions quickstart](https://docs.github.com/en/actions/get-started/quickstart) · [GitHub Docs license](https://github.com/github/docs/blob/main/LICENSE).
- Node.js contributors, [Node.js 22 test runner](https://nodejs.org/docs/latest-v22.x/api/test.html) · [Node.js license](https://github.com/nodejs/node/blob/main/LICENSE).
