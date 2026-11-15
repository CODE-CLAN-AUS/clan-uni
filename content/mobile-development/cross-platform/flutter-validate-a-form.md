---
title: "Validate a Flutter Booking Form"
description: "Validate a booking name locally and give clear feedback from a single Flutter form."
tags: ["Flutter","forms"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Validate a booking name locally and give clear feedback from a single Flutter form.

<!--more-->

**Prerequisites** — Flutter SDK and a runnable Flutter project. Use a `StatefulWidget` with Material widgets inside a `Scaffold`.

## Give the form a stable identity

In the page's `State` class add `final formKey = GlobalKey<FormState>();` and `String name = '';`. The key belongs to the state instance so it survives rebuilds. Put this form in the scaffold body.

```dart
Form(
  key: formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: const InputDecoration(labelText: 'Booking name'),
        validator: (value) {
          if ((value ?? '').trim().length < 2) {
            return 'Enter at least two characters.';
          }
          return null;
        },
        onSaved: (value) => name = value!.trim(),
      ),
      ElevatedButton(
        onPressed: () {
          final form = formKey.currentState!;
          if (!form.validate()) return;
          form.save();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Preview booking for $name')),
          );
        },
        child: const Text('Preview'),
      ),
    ],
  ),
)
```

## Separate validation and submission

`validate()` calls each validator and exposes errors under its field. Only a successful validation reaches `save()` here. The snackbar is a local preview. A real booking service must also enforce its required fields and availability on the server.

## Practice and check

Submit a blank name, a single character and `  Ari  `. Expect the first two to fail and the third to show Ari without padding. Add a second field for the number of guests and require an integer from 1 to 6. Check the form with a keyboard on desktop and with the software keyboard visible on mobile.

## Sources

Original lesson text and examples. The following references informed this course.

- Flutter documentation contributors, [Build a form with validation](https://docs.flutter.dev/cookbook/forms/validation) · [Flutter website content license](https://github.com/flutter/website/blob/main/LICENSE).
