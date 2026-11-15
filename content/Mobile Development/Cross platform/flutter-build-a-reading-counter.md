---
title: "Build a Flutter Reading Counter"
description: "Manage local widget state and verify the same counter on two Flutter targets."
tags: ["Flutter","Dart"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Manage local widget state and verify the same counter on two Flutter targets.

<!--more-->

**Prerequisites** — Flutter SDK and two configured targets, such as Chrome and an Android emulator.

## Start with one state owner

Run `flutter create reading_counter` and open the project. Replace `lib/main.dart`.

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MaterialApp(home: ReadingCounter()));

class ReadingCounter extends StatefulWidget {
  const ReadingCounter({super.key});

  @override
  State<ReadingCounter> createState() => _ReadingCounterState();
}

class _ReadingCounterState extends State<ReadingCounter> {
  int pages = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reading counter')),
      body: Center(child: Text('Pages read: $pages')),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add a page',
        onPressed: () => setState(() => pages += 1),
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

`setState` schedules a rebuild for the widget. The state object owns `pages` across builds. Leave the counter out of `build` so a rebuild doesn't reset it.

## Compare the same interaction

Run `flutter devices` and select a device with `flutter run -d DEVICE_ID`. Repeat on the second target. Add three pages on each. The displayed value should reach three separately because each app instance holds its own state.

## Practice and check

Add a reset control below the label and disable it at zero. Constrain the content width on a wide browser by wrapping the controls in a `ConstrainedBox`. Verify both controls at the narrowest and widest sizes you can run.

## Sources

Original lesson text and examples. The following references informed this course.

- Flutter documentation contributors, [Simple app state management](https://docs.flutter.dev/data-and-backend/state-mgmt/simple) · [Flutter website content license](https://github.com/flutter/website/blob/main/LICENSE).
