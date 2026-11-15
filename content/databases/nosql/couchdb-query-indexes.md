---
title: "Query and Index CouchDB Documents"
description: "Use Mango selectors and an index to build a collection queue for a repair shop."
tags: ["NoSQL","CouchDB"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use Mango selectors and an index to build a collection queue for a repair shop.

<!--more-->

**Prerequisites** — A local CouchDB instance and basic JSON. Create a database named `repairs` in Fauxton.

## Seed a small fixture

Create three documents with distinct IDs. Give them these pairs of values for `status` and `customer`: `ready` and `Ivy`, `waiting` and `Kai`, `ready` and `Jo`. Add a `type` field with value `repair` to each. Add a fourth document with `type` set to `delivery` and `status` set to `ready`.

## Select and project

Open the database's Mango query view and submit the following request. `selector` chooses documents, while `fields` limits what comes back for each match.

```json
{
  "selector": {"type": "repair", "status": "ready"},
  "fields": ["_id", "customer"]
}
```

Expect Ivy and Jo in an unspecified order. Check that the delivery record is excluded even though it shares the ready status.

## Add an index

In Fauxton's index management view, create a JSON index with definition `{"index":{"fields":["type","status"]},"name":"repair-queue","type":"json"}`. Run the selector again. The result set should stay the same. To inspect index selection, send the same query body to `POST /repairs/_explain` with an authenticated local HTTP client and inspect the chosen index.

## Practice and check

Add a second report that asks for waiting repairs. It should return Kai only. Explain how an index can make lookup cheaper while increasing work during writes. Record the chosen index and matching document IDs as evidence.

## Sources

Original lesson text and examples. The following references informed this course.

- Apache Software Foundation, [CouchDB Mango queries](https://docs.couchdb.org/en/stable/api/database/find.html) · [Apache 2.0](https://github.com/apache/couchdb/blob/main/LICENSE).
