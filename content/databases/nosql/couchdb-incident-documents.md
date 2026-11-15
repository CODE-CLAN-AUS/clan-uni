---
title: "Model Incident Documents in CouchDB"
description: "Store a trail maintenance report and handle competing edits using document revisions."
tags: ["NoSQL","CouchDB"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Store a trail maintenance report and handle competing edits using document revisions.

<!--more-->

**Prerequisites** — A local CouchDB server, an admin account and Fauxton at `http://127.0.0.1:5984/_utils/`.

## Design a document around a read

A crew opens a report to see its description, location and a short triage history. Store those values together to make that screen a single document fetch. Store photos or an unbounded history separately so a routine edit stays small.

Create an `incidents` database in Fauxton and save this document.

```json
{
  "_id": "ridge-17",
  "type": "trail_report",
  "site": "North Ridge",
  "status": "new",
  "triage": [{ "note": "Loose board at marker 4" }]
}
```

## Save a revision

Open the saved document and note its `_rev`. Update `status` to `assigned` and save. CouchDB returns a different revision. The revision is an opaque token that identifies the version used as the basis for the next edit.

## Resolve two competing edits

Read the same revision in two tabs. In one, update `site`. In the other, add a triage item using the stale revision. The second save should be rejected or surfaced as a conflict by the client. Reload the latest version, reapply your triage item and save using the fresh revision. If both editors touched the same field, decide which value to keep before retrying.

## Practice and check

Simulate an inspector and a dispatcher making independent edits. Confirm both changes survive in the final document. Explain which edits you can reapply automatically and which require a policy or a person to resolve.

## Sources

Original lesson text and examples. The following references informed this course.

- Apache Software Foundation, [CouchDB core API](https://docs.couchdb.org/en/stable/intro/api.html) · [Apache 2.0](https://github.com/apache/couchdb/blob/main/LICENSE).
