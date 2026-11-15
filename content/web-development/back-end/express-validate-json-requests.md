---
title: "Validate JSON Requests in Express"
description: "Build a small local endpoint and distinguish malformed JSON from a rejected business input."
tags: ["Node.js","Express"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Build a small local endpoint and distinguish malformed JSON from a rejected business input.

<!--more-->

**Prerequisites** — Node.js 22 or newer, npm and curl. In a scratch directory run `npm init -y` and `npm install express@5`.

## Parse and validate at the boundary

Save `app.cjs` as follows. The body-size limit bounds the parser's work. The handler applies its own rules after parsing.

```js
const express = require('express');
const app = express();
const tickets = [];
app.use(express.json({ limit: '8kb' }));

app.post('/tickets', (req, res) => {
  const subject = req.body?.subject;
  if (typeof subject !== 'string' || !subject.trim() || subject.trim().length > 80) {
    return res.status(400).json({ error: 'Subject must have 1 to 80 characters.' });
  }
  const ticket = { id: tickets.length + 1, subject: subject.trim() };
  tickets.push(ticket);
  return res.status(201).json(ticket);
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Malformed JSON.' });
  }
  return next(error);
});

app.listen(5081, '127.0.0.1');
```

## Compare three requests

Start with `node app.cjs`. Save `{"subject":"  Door squeaks  "}` to `valid.json` and run `curl -i -H "Content-Type: application/json" --data-binary @valid.json http://127.0.0.1:5081/tickets`. In PowerShell use `curl.exe` and quote `"@valid.json"`. Expect 201 and a trimmed subject.

Repeat with a file containing `{"subject":""}` and a file containing only `{`. Both receive 400. Each error message identifies a different layer.

## Practice and check

Add `GET /tickets/:id` and return 404 for an unknown ticket. Confirm that successful POSTs create IDs while failed POSTs leave the next ID untouched. Restart the server and explain why the in-memory tickets disappear.

## Sources

Original lesson text and examples. The following references informed this course.

- Express contributors, [Routing guide](https://expressjs.com/en/guide/routing/) · [Express website license](https://github.com/expressjs/expressjs.com/blob/main/LICENSE.md).
- Express contributors, [Express 5 API](https://expressjs.com/en/5x/api.html#express.json) · [Express website license](https://github.com/expressjs/expressjs.com/blob/main/LICENSE.md).
