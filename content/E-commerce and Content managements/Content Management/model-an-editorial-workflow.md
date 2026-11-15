---
title: "Model an Editorial Workflow"
description: "Design the content fields and publication checks for a community events website."
tags: ["CMS","content modelling"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Design the content fields and publication checks for a community events website.

<!--more-->

**Prerequisites** — Basic JSON and access to a text editor.

## Design for handover

Editors need a title, stable slug, venue, start time and lifecycle state. Keep the publication state separate from the event date. An event can be scheduled for June while its page is published in May. Put the time-zone offset in the timestamp so the moment is unambiguous.

```json
{
  "title": "Lantern Repair Meetup",
  "slug": "lantern-repair-meetup",
  "venue": "Riverside Workshop",
  "startsAt": "2027-06-08T18:30:00+10:00",
  "state": "draft"
}
```

## Validate at the publishing boundary

Allow incomplete drafts. When an editor requests publication, validate the required fields, slug uniqueness, timestamp and editor permission on the server. Browser validation can surface problems early. The publishing command still needs to verify the full record.

## Make lifecycle changes explicit

Define a transition table with `draft → review → published → archived` and `review → draft` for revisions. Assign who may make each transition. Public results should include published records only. Preview routes need an access check, even if their URLs are hard to guess.

## Practice and check

Write a table of three records and the expected result of publishing each. Include a duplicate slug and a missing venue. Then archive a published event and verify that it disappears from the public listing while remaining editable in the CMS.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
