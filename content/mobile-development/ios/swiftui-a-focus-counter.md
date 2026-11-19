---
title: "Build a SwiftUI Focus Counter"
description: "Bind a Stepper to local view state and show the derived session goal."
tags: ["iOS","SwiftUI"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Bind a Stepper to local view state and show the derived session goal.

<!--more-->

**Prerequisites** — macOS, Xcode and a new iOS App project using SwiftUI.

## Keep the editable value local

Replace `ContentView.swift` with the following. Leave the generated app entry point in place.

```swift
import SwiftUI

struct ContentView: View {
    @State private var sessions = 1

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Stepper("Focus sessions: \(sessions)", value: $sessions, in: 1...8)
            Text("\(sessions * 25) minutes planned")
            Button("Reset") { sessions = 1 }
                .disabled(sessions == 1)
        }
        .padding()
    }
}
```

`@State` stores the value for the view's identity. `$sessions` passes a binding, allowing the stepper to write to the same state. The planned minutes derive from the count every time, so both values stay in sync.

## Exercise the bounds

Open the app on a simulator and try to step below one or above eight. The total should range from 25 to 200 minutes. Reset should return the count to one and disable itself. Relaunch the app to observe the distinction between transient and persisted state.

## Practice and check

Extract the stepper into a child `SessionPicker` with `@Binding var sessions: Int`. Construct it as `SessionPicker(sessions: $sessions)` from the parent. Verify the label, bounds and Reset still agree. Add a second derived label showing hours and remaining minutes.

## Sources

Original lesson text and examples. The following references informed this course.

- Swift project contributors, [Properties and property wrappers](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/properties/) · [The Swift Programming Language license](https://github.com/swiftlang/swift-book/blob/main/LICENSE.txt).
- Apple, [Food Truck SwiftUI sample](https://github.com/apple/sample-food-truck) · [Sample code license](https://github.com/apple/sample-food-truck/blob/main/LICENSE.txt).
