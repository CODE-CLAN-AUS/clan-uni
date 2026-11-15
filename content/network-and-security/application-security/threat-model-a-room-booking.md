---
title: "Threat Model a Room Booking Service"
description: "Map trust boundaries and turn three realistic threats into security checks."
tags: ["Application security","threat modelling"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Map trust boundaries and turn three realistic threats into security checks.

<!--more-->

**Prerequisites** — Basic HTTP and a plain text editor. The service in this course is fictional.

## Trace one user action

Draw three boxes labelled browser, API and database. Connect the browser to the API with a booking request and the API to the database with a reservation write. Add a fourth box for an admin interface that receives the booking list. Mark where data crosses between different levels of trust.

## Ask what each boundary accepts

The browser controls form fields and path IDs. The API knows the logged-in user only after checking the session. The database accepts authorised service writes. The admin interface renders text that originated in user input.

| Threat | Proposed control | Verification |
| --- | --- | --- |
| A viewer changes a booking ID to read someone else's booking | Check access to the requested object on the API | User A requests B's ID and receives no booking data |
| Two requests claim the last room slot | Enforce slot uniqueness in the database | Run two simultaneous requests and observe exactly one reservation |
| A nightly export exposes personal notes | Export only approved fields | Scan a test export for a synthetic private marker |

## Prioritise by consequence and feasibility

Record who can attempt each action and the effect of success. Tie each proposed control to a specific test and owner. A vague requirement such as “secure bookings” is hard to verify.

## Practice and check

Add the admin rendering threat. Decide how the interface should handle an event title containing angle brackets and write a verification case. Pick one remaining threat, explain its impact and define the evidence that would persuade you it is controlled.

## Sources

Original lesson text and examples. The following references informed this course.

- OWASP contributors, [Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html) · [CC BY-SA 4.0](https://owasp.org/projects/cheat-sheet-series).
- OWASP contributors, [REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) · [CC BY-SA 4.0](https://owasp.org/projects/cheat-sheet-series).
