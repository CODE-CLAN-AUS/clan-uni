---
title: "Build a Compose Water Counter"
description: "Use Compose state to update a screen and restore a count after activity recreation."
tags: ["Android","Jetpack Compose"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use Compose state to update a screen and restore a count after activity recreation.

<!--more-->

**Prerequisites** — Android Studio, a Kotlin Empty Activity project with Compose and an emulator or Android device.

## Replace the starter screen

Call `WaterCounter()` from the existing `setContent` block. Keep the generated app theme. Use Material 3's `Button` and `Text`, foundation's `Column`, `androidx.compose.runtime.*` and `androidx.compose.runtime.saveable.rememberSaveable`.

```kotlin
@Composable
fun WaterCounter() {
    var cups by rememberSaveable { mutableStateOf(0) }
    Column {
        Text("Cups today: $cups")
        Button(onClick = { cups += 1 }) { Text("Add a cup") }
        Button(onClick = { cups = 0 }, enabled = cups > 0) { Text("Reset") }
    }
}
```

## Follow a state update

The button sends an event. The click handler changes observable state. Compose sees that the label reads that state and updates the relevant UI. Read `cups` directly in the label so there is one source of truth.

## Check recreation

Add three cups and rotate the emulator. With normal activity recreation and state restoration the label should still say three. A saveable value can survive supported activity recreation. Use persistent storage for an actual daily history.

## Practice and check

Add a button that removes one cup. Disable it at zero and keep the decrement guarded. Test 0 → 1 → 0 and verify another decrement is impossible. Rotate with a count of two and press Reset after recreation.

## Sources

Original lesson text and examples. The following references informed this course.

- Android Developers, [State and Jetpack Compose](https://developer.android.com/develop/ui/compose/state) · [Android documentation license](https://developer.android.com/license).
