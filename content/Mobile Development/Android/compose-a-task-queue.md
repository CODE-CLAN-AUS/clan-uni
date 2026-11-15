---
title: "Build a Compose Task Queue"
description: "Use stable keys and immutable updates to mark tasks complete in a lazy list."
tags: ["Android","Jetpack Compose"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use stable keys and immutable updates to mark tasks complete in a lazy list.

<!--more-->

**Prerequisites** — A Compose Empty Activity project and familiarity with Kotlin data classes.

## Model identity

Create `data class Task(val id: Int, val label: String, val done: Boolean = false)`. In your screen, define `var tasks by remember { mutableStateOf(listOf(Task(1, "Sweep"), Task(2, "Sweep"), Task(3, "Lock up"))) }`. Duplicate labels are intentional. Use the ID to identify rows.

## Connect rows to events

Inside the same composable, use `LazyColumn` and import `androidx.compose.foundation.lazy.items`. Import `Checkbox` and `Text` from Material 3 and `Row` from foundation layout.

```kotlin
LazyColumn {
    items(tasks, key = { it.id }) { task ->
        Row {
            Checkbox(
                checked = task.done,
                onCheckedChange = { checked ->
                    tasks = tasks.map {
                        if (it.id == task.id) it.copy(done = checked) else it
                    }
                }
            )
            Text(task.label)
        }
    }
}
```

Assigning a new list gives Compose an observable state change. A stable key lets Compose track the same row when the list order changes.

## Keep state in the owner

Extract a `TaskRow` taking a task and an `onDoneChange: (Boolean) -> Unit` callback. Its checkbox reads `task.done` from the parent. The screen owns the list and decides how a checkbox event updates it.

## Practice and check

Toggle the second Sweep task. Add a button to reverse the list, then confirm that the completed flag stays with ID 2. If reopening the activity needs to preserve the list, describe where you would persist it and how to restore it.

## Sources

Original lesson text and examples. The following references informed this course.

- Android Developers, [State and Jetpack Compose](https://developer.android.com/develop/ui/compose/state) · [Android documentation license](https://developer.android.com/license).
- Android Developers, [Lists and grids](https://developer.android.com/develop/ui/compose/lists) · [Android documentation license](https://developer.android.com/license).
