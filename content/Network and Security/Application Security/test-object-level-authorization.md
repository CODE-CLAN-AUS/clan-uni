---
title: "Test Object-Level Authorization"
description: "Build and test access rules that keep one user's project separate from another's."
tags: ["Application security","authorization"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Build and test access rules that keep one user's project separate from another's.

<!--more-->

**Prerequisites** — Node.js 22 or newer and basic JavaScript. Use the fictional identities in the lab.

## Put the check at the access boundary

Authentication establishes who sent the request. Authorization determines whether that identity can read the requested project. A browser can change an ID before sending it, so the code serving the object must check the relationship.

## Write a local policy function

Save this as `access.cjs` and run `node access.cjs`.

```js
const assert = require('node:assert/strict');
const projects = new Map([
  ['p1', { ownerId: 'ari', title: 'Canal Cleanup' }],
  ['p2', { ownerId: 'lea', title: 'Seed Library' }],
]);

function findProject(userId, projectId) {
  const project = projects.get(projectId);
  return project && project.ownerId === userId ? project : null;
}

assert.equal(findProject('ari', 'p1').title, 'Canal Cleanup');
assert.equal(findProject('ari', 'p2'), null);
assert.equal(findProject('ari', 'missing'), null);
```

The valid user ID would come from the verified server-side identity in a real request. The response may deliberately use 404 for both inaccessible and absent records if existence is sensitive.

## Apply the same rule to writes

A read policy alone leaves write endpoints exposed. Before changing or deleting a project, enforce the action-specific access rule. Privileged operations such as transferring ownership can require a stricter rule.

## Practice and check

Add a reader named Nia to project p1. Give Nia read access but deny edits. Add assertions for owner, reader, stranger and absent project. Verify that swapping the requested ID never reveals the other owner's project.

## Sources

Original lesson text and examples. The following references informed this course.

- OWASP contributors, [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) · [CC BY-SA 4.0](https://owasp.org/projects/cheat-sheet-series).
