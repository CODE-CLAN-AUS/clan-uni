---
title: "Render a Published Content Feed"
description: "Render an event feed from JSON using browser DOM APIs and a public content boundary."
tags: ["CMS","JavaScript"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Render an event feed from JSON using browser DOM APIs and a public content boundary.

<!--more-->

**Prerequisites** — Basic HTML and JavaScript and Python 3 for a local static server.

## Prepare a public export

Create `events.json` containing `[{"title":"Lantern Repair Meetup","venue":"Riverside Workshop"}]`. In a CMS, generate this public file from published rows only. Even if the interface filters the data, a browser can read every row sent to it.

## Render each record as text

Save this file beside the feed as `index.html`. Start `python -m http.server 8000 --bind 127.0.0.1` in that directory and open `http://127.0.0.1:8000/`.

```html
<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Community events</title>
<h1>Community events</h1>
<p id="status" role="status">Loading events…</p>
<ul id="events"></ul>
<script type="module">
  const status = document.querySelector('#status');
  const list = document.querySelector('#events');

  try {
    const response = await fetch('./events.json');
    if (!response.ok) throw new Error('Feed unavailable');
    const events = await response.json();
    for (const event of events) {
      const item = document.createElement('li');
      item.textContent = event.title + ' — ' + event.venue;
      list.append(item);
    }
    status.textContent = events.length ? '' : 'No upcoming events.';
  } catch {
    status.textContent = 'Events could not be loaded.';
  }
</script>
</html>
```

## Check unusual content

Change the title to `<em>Night Shift</em>`. The angle brackets should appear as text because `textContent` assigns text directly. Rename the feed temporarily to exercise the failure message.

## Practice and check

Publish a second event and verify that both appear after refreshing. Set the export to `[]` and check the empty message. Document which fields your CMS export includes and why editorial notes stay private.

## Sources

Original lesson text and examples. The following references informed this course.

- MDN contributors, [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
- MDN contributors, [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) · [CC BY-SA 2.5 for MDN prose](https://github.com/mdn/content/blob/main/LICENSE.md).
