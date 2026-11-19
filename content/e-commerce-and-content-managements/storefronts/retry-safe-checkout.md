---
title: "Design a Retry-Safe Checkout"
description: "Turn retries and duplicate payment events into one order in a local checkout simulation."
tags: ["E-commerce","APIs"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Turn retries and duplicate payment events into one order in a local checkout simulation.

<!--more-->

**Prerequisites** — Basic SQL and HTTP. Use a local simulation with fictional orders and no payment details.

## Define the order states

Use `pending`, `paid` and `cancelled`. The server creates a pending order and only accepted events can move it to a terminal state. A duplicate delivery should leave a paid order paid. A late failure must follow an explicit recovery policy.

## Give each checkout attempt an identity

Store the buyer ID, checkout key, a fingerprint of the checkout inputs and a server-generated order ID. Set a unique constraint on `(buyer_id, checkout_key)`. If the same buyer retries with the same inputs, return the existing order. Return a conflict for a reused key with different inputs. Use a database transaction when recording the order and its identity so they commit together.

## Process an event once

Simulate an event containing an event ID, order ID, amount and currency. A real integration must independently verify that the event came from its payment provider. In the simulation, compare the amount and currency with the order, then insert the event ID into a table with a unique key. Update the order in the same transaction. Use a conditional update such as `WHERE state = 'pending'` to guard the transition.

## Practice and check

Model the request and event handlers in pseudocode or a disposable PostgreSQL database. Replay a checkout request twice and a payment event twice. Expect one order and one transition to paid. Submit a wrong amount, then the correct amount under a different event ID. Only the verified matching event should pay the order. Also document what would happen if an independent refund arrives after payment.

## Sources

Original lesson text and examples. The following references informed this course.

- PostgreSQL Global Development Group, [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) · [PostgreSQL License](https://www.postgresql.org/about/licence/).
- OWASP contributors, [REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) · [CC BY-SA 4.0](https://owasp.org/projects/cheat-sheet-series).
