---
title: "Transactions and Stock Reservations"
description: "Prevent negative stock and roll back a failed reservation in PostgreSQL."
tags: ["SQL","transactions"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Prevent negative stock and roll back a failed reservation in PostgreSQL.

<!--more-->

**Prerequisites** — A disposable PostgreSQL database and familiarity with `UPDATE`.

## Enforce the invariant

A reservation changes inventory only if sufficient units remain. Add a database constraint as a second line of defence against other writers.

```sql
CREATE TABLE workshop_stock (
  sku text PRIMARY KEY,
  remaining integer NOT NULL CHECK (remaining >= 0)
);
INSERT INTO workshop_stock VALUES ('felt-kit', 5);
```

## Reserve with a conditional write

A separate read followed by an unconditional decrement can race with another checkout. Express the availability check in the write itself.

```sql
BEGIN;
UPDATE workshop_stock
SET remaining = remaining - 4
WHERE sku = 'felt-kit' AND remaining >= 4
RETURNING remaining;
COMMIT;
```

A result of 1 means the reservation succeeded. Zero returned rows means no reservation was made. In an application, check that result before inserting a reservation record in the same transaction. Validate that the requested quantity is positive before issuing the statement.

## Observe a concurrent attempt

Reset the stock to 5 and open two SQL sessions at PostgreSQL's default Read Committed level. Begin the reservation in session A and pause before commit. Run the same update in session B. Its write waits for A's lock. Commit A, then verify that B returns zero rows because PostgreSQL checks the updated value.

## Practice and check

Reset the stock again. Repeat the two-session experiment but roll back A. B should now return 1. Commit B and select the final stock. Try setting stock directly to −1 and confirm that the constraint rejects the write.

## Sources

Original lesson text and examples. The following references informed this course.

- PostgreSQL Global Development Group, [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html) · [PostgreSQL License](https://www.postgresql.org/about/licence/).
- PostgreSQL Global Development Group, [Transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) · [PostgreSQL License](https://www.postgresql.org/about/licence/).
