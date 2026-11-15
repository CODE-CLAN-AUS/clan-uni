---
title: "Model a Packing List in Swift"
description: "Represent packing states with an enum and track items using stable Swift identifiers."
tags: ["iOS","Swift"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Represent packing states with an enum and track items using stable Swift identifiers.

<!--more-->

**Prerequisites** — A Swift toolchain. Use an Xcode playground or save as `packing.swift` and run `swift packing.swift`.

## Represent the possible states

A packing item can be waiting or packed. An enum gives each state a name. A struct describes one item. `Identifiable` exposes a stable ID that an iOS list can use to track rows.

```swift
enum PackingState {
    case waiting
    case packed
}

struct PackingItem: Identifiable {
    let id: Int
    let name: String
    var state: PackingState
}

var items = [
    PackingItem(id: 1, name: "Water bottle", state: .waiting),
    PackingItem(id: 2, name: "Trail map", state: .waiting)
]
```

## Update by ID

Find the item's index and mutate that entry. Returning a Boolean lets the caller detect a stale ID.

```swift
@discardableResult
func pack(_ id: Int, in items: inout [PackingItem]) -> Bool {
    guard let index = items.firstIndex(where: { $0.id == id }) else {
        return false
    }
    items[index].state = .packed
    return true
}

pack(2, in: &items)
print(items.filter { $0.state == .packed }.map(\.name))
```

The result contains only Trail map. An item name can change while its ID stays fixed.

## Practice and check

Add another item also named Trail map. Check that packing ID 2 leaves the duplicate waiting. Add an `unpack` operation, then call it on an unknown ID and verify that the array is unchanged. Add assertions with `precondition` to turn those checks into a repeatable script.

## Sources

Original lesson text and examples. The following references informed this course.

- Swift project contributors, [Enumerations](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations/) · [The Swift Programming Language license](https://github.com/swiftlang/swift-book/blob/main/LICENSE.txt).
