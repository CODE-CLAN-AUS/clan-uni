---
title: "Collect Cargo with Godot Signals"
description: "Link physics overlap to an on-screen score and make every collectible count once."
tags: ["Godot","signals"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Link physics overlap to an on-screen score and make every collectible count once.

<!--more-->

**Prerequisites** — Godot 4 and a 2D scene with a moving `CharacterBody2D` player.

## Make a cargo scene

Create an `Area2D` root named `Cargo` with a visible polygon and a `CollisionShape2D` child. Keep monitoring enabled and let its collision mask include the player's layer. Add the player node to the `courier` group.

## Emit a single collection event

Attach this script to the cargo root. In the editor, connect `body_entered` on that node to the method below.

```gdscript
extends Area2D

signal collected(points: int)

var claimed := false

func _on_body_entered(body: Node2D) -> void:
    if claimed or not body.is_in_group("courier"):
        return
    claimed = true
    collected.emit(1)
    queue_free()
```

Set the guard before emitting because `queue_free()` schedules deletion. Any repeated callback in the same frame sees the guard.

## Keep the score outside the cargo

In your level scene, instance two cargo nodes and add a `CanvasLayer` named `HUD` with a `Label` named `Score`. Set the label text to `0`. Attach this code to the level root and connect both cargo instances' `collected` signals to it.

```gdscript
extends Node2D

var score := 0

func _on_cargo_collected(points: int) -> void:
    score += points
    $HUD/Score.text = str(score)
```

## Practice and check

Collect both objects and observe 0, 1 and 2 on the HUD. Restart the scene and verify the score resets. Place both objects at the same position and check that the score increases by exactly two. Add a non-player physics body and confirm that it cannot collect cargo.

## Sources

Original lesson text and examples. The following references informed this course.

- Juan Linietsky, Ariel Manzur and the Godot Engine community, [Area2D](https://docs.godotengine.org/en/stable/classes/class_area2d.html) · [CC BY 3.0](https://docs.godotengine.org/en/stable/about/faq.html).
- Juan Linietsky, Ariel Manzur and the Godot Engine community, [Using signals](https://docs.godotengine.org/en/stable/getting_started/step_by_step/signals.html) · [CC BY 3.0](https://docs.godotengine.org/en/stable/about/faq.html).
