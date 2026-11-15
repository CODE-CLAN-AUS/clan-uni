---
title: "Steer a 2D Courier in Godot"
description: "Build a controllable top-down character using normalized input and collision-aware movement."
tags: ["Godot","2D games"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Build a controllable top-down character using normalized input and collision-aware movement.

<!--more-->

**Prerequisites** — Godot 4 and basic GDScript. Start a new project.

## Assemble the courier

Create a `Node2D` scene. Add a `CharacterBody2D` named `Courier` with a `CollisionShape2D` child. Give the collision shape a small rectangle. Add a visible `Polygon2D` triangle or a local sprite so you can see the courier. Place it near the centre of the viewport.

## Move at a consistent speed

Create four Input Map actions in Project Settings named `steer_left`, `steer_right`, `steer_up` and `steer_down`, then bind arrow keys. Attach this script to `Courier`.

```gdscript
extends CharacterBody2D

@export var speed := 180.0

func _physics_process(_delta: float) -> void:
    var direction := Input.get_vector(
        "steer_left", "steer_right", "steer_up", "steer_down"
    )
    velocity = direction * speed
    move_and_slide()
```

The input vector limits the combined magnitude to 1, so holding right and down keeps the same top speed. `move_and_slide()` uses the physics timestep internally.

## Add a barrier

Add a `StaticBody2D` with a rectangle collision shape as a sibling of the courier. Draw a visible rectangle over the barrier. Move the courier into it head-on, then diagonally. It should stop against the wall and continue along its surface when there is room.

## Practice and check

Create a two-wall corner. Verify that releasing the keys stops the courier, opposite inputs cancel and the corner blocks movement. Lower the speed to 90 in the inspector and confirm that travelling the same distance takes about twice as long.

## Sources

Original lesson text and examples. The following references informed this course.

- Juan Linietsky, Ariel Manzur and the Godot Engine community, [CharacterBody2D](https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html) · [CC BY 3.0](https://docs.godotengine.org/en/stable/about/faq.html).
