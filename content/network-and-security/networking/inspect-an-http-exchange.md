---
title: "Inspect an HTTP Exchange"
description: "Capture status codes and headers from a local server and distinguish HTTP errors from connection failures."
tags: ["Networking","HTTP"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Capture status codes and headers from a local server and distinguish HTTP errors from connection failures.

<!--more-->

**Prerequisites** — Python 3 and curl. On Windows use `curl.exe`. In a new empty folder create `index.html` containing the text `Lab ready`.

## Serve the fixture

Start `python -m http.server 8000 --bind 127.0.0.1`. Binding to loopback makes the exercise local. In a second terminal make these requests.

```bash
curl -i http://127.0.0.1:8000/
curl -i http://127.0.0.1:8000/missing.txt
curl -I http://127.0.0.1:8000/
```

`-i` includes response headers with the body. `-I` sends HEAD, so the output contains the headers without the response body. Expect a 200 for the first and third commands and a 404 for the second.

## Map the response to a layer

A 404 means a server accepted the HTTP request and responded. Stop the server and run the first command again. A connection error occurs before any HTTP status can arrive. That points toward a different set of checks, such as the port and listener.

## See request and response together

Restart the server. Run `curl -v http://127.0.0.1:8000/` and find the request method, request target, host and the response status. curl prefixes outgoing headers with `>` and incoming headers with `<` in its verbose trace.

## Practice and check

Create `notice.txt` and request it. Record its media type, then compare it with the root HTML file. Submit a short troubleshooting log for the successful response, missing file and stopped server. Include the evidence you used to place each failure.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
- MDN contributors, [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
