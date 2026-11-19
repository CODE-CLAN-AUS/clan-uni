---
title: "Build a 3D Checkpoint Trigger"
description: "Use an overlap volume to activate a checkpoint without blocking player movement."
tags: ["Godot","3D physics"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Use an overlap volume to activate a checkpoint without blocking player movement.

<!--more-->

**Prerequisites** — Godot 4 and a scene with a moving `CharacterBody3D`.

## Separate obstacles from triggers

A static collider blocks movement. A monitored area reports overlap with bodies on its collision mask. Add an `Area3D` above the floor and a `CollisionShape3D` child with a box shape. Use a visible floor marker to show where the checkpoint begins. Put the player in the `visitor` group.

## Track first entry

Add a `Node3D` child called `ActivatedMarker` with a visible mesh child and hide the marker initially. Attach this script to the area and connect its `body_entered` signal to the method.

```gdscript
extends Area3D

var activated := false

func _on_body_entered(body: Node3D) -> void:
    if activated or not body.is_in_group("visitor"):
        return
    activated = true
    $ActivatedMarker.show()
    print("Checkpoint registered")
```

An area can detect the player only when the player's layer is part of the area's collision mask. Match those settings before debugging the script.

## Turn an event into level progress

Add a `reached` signal on the area and emit it after setting `activated`. Connect it on the level root to increment a checkpoint total. Keep the per-checkpoint guard on the area so each instance owns its own state.

## Practice and check

Place two copies of the checkpoint. Walk through A, back through A, then through B. The total should go from 0 to 1, stay at 1 and then rise to 2. Enter B first after a restart and confirm each checkpoint can activate independently.

## Sources

Original lesson text and examples. The following references informed this course.

- Juan Linietsky, Ariel Manzur and the Godot Engine community, [Area3D](https://docs.godotengine.org/en/stable/classes/class_area3d.html) · [CC BY 3.0](https://docs.godotengine.org/en/stable/about/faq.html).
