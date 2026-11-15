---
title: "SQL for a Tool Library"
description: "Query a lending database to find available tools and measure borrowing activity."
tags: ["SQL","PostgreSQL"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Query a lending database to find available tools and measure borrowing activity.

<!--more-->

**Prerequisites** — A PostgreSQL database for practice and access to its SQL console.

## Model tools and loans

A tool has a stable ID even if its display name changes. A loan points back to that ID, and a missing return date marks an open loan. Start with a database that contains no tables named `tool` or `loan`.

```sql
CREATE TABLE tool (id integer PRIMARY KEY, label text NOT NULL);
CREATE TABLE loan (
  id integer PRIMARY KEY,
  tool_id integer NOT NULL REFERENCES tool(id),
  returned_on date
);
INSERT INTO tool VALUES (1, 'Hand drill'), (2, 'Sander'), (3, 'Clamp');
INSERT INTO loan VALUES (1, 1, NULL), (2, 2, DATE '2025-03-02');
```

## Find what's available

`NOT EXISTS` keeps a tool only when the subquery finds no open loan for that specific tool. An equality test against `NULL` produces an unknown result, so use `IS NULL`.

```sql
SELECT t.label
FROM tool AS t
WHERE NOT EXISTS (
  SELECT 1 FROM loan AS l WHERE l.tool_id = t.id AND l.returned_on IS NULL
)
ORDER BY t.label;
```

You should see Clamp and Sander. Enter an open loan for the clamp and run the query again.

## Count activity

Join from tools to loans with a `LEFT JOIN` so tools with no loans stay in the report. Group by tool ID and label and count `loan.id`. The unmatched row has a missing loan ID. `COUNT(*)` would count that row anyway.

## Practice and check

Restore the original fixture. Report the lifetime loan count for every tool, sorted by count descending and then ID. The counts should be 1, 1 and 0. Add an open loan for the sander and check that its lifetime count rises to 2 while availability drops to a single tool.

## Sources

Original lesson text and examples. The following references informed this course.

- PostgreSQL Global Development Group, [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) · [PostgreSQL License](https://www.postgresql.org/about/licence/).
