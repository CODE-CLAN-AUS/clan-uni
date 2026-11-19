---
title: "Trace a DNS Lookup"
description: "Read DNS answers and distinguish names, addresses and lookup failures."
tags: ["Networking","DNS"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Read DNS answers and distinguish names, addresses and lookup failures.

<!--more-->

**Prerequisites** — A terminal with `nslookup`. The live lookups require internet access.

## Start with the question

An application usually starts with a hostname. A recursive DNS resolver can answer from cache or look up information on its behalf. The resolver address displayed by `nslookup` is the server answering your question. It is separate from the answer to the question.

```text
nslookup -type=A example.com
nslookup -type=AAAA example.com
nslookup -type=MX example.com
```

An A record carries an IPv4 address, an AAAA record carries an IPv6 address and an MX record expresses mail routing. Record the answer types and values. The exact values can change over time. A non-authoritative answer can come from a recursive resolver's cache.

## Compare absence with transport failure

Run `nslookup never-exists.invalid`. A response indicating a nonexistent domain means the resolver replied. A timeout means the client lacked a usable response within its time budget. A valid hostname can also exist without a record of the requested type.

## Consider cached data

DNS answers carry a time to live. If your system has `dig`, repeat `dig example.com A` and inspect the numeric TTL column. The TTL can count down for answers served by the same cache. A refreshed entry or a different resolver may show different values.

## Practice and check

Write a three-row troubleshooting log showing one address answer, one mail answer and one negative lookup. Include the resolver and exact command in each row. Explain how you would distinguish a missing website record from a DNS timeout before inspecting the web server.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [DNS glossary](https://developer.mozilla.org/en-US/docs/Glossary/DNS) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
