---
title: "Build a Walkable 3D Room"
description: "Create a small Godot scene with a camera, solid ground and a controllable visitor."
tags: ["Godot","3D games"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Create a small Godot scene with a camera, solid ground and a controllable visitor.

<!--more-->

**Prerequisites** — Godot 4 and basic GDScript. Create a fresh 3D project.

## Build the floor and visitor

Use a `Node3D` root. Add a `StaticBody3D` with a `BoxShape3D` collision shape sized (12, 1, 12) and a visible `BoxMesh` of the same size. Set the body at Y = −0.5 so the top is at Y = 0. Add a `DirectionalLight3D` angled toward the scene. Add a `CharacterBody3D` visitor at Y = 2 with a capsule collision shape and a `Camera3D` child at Y = 0.6. Enable the camera's Current property.

## Apply movement and falling

Attach this script to the visitor. It uses the project's built-in UI arrow actions.

```gdscript
extends CharacterBody3D

func _physics_process(delta: float) -> void:
    var steer := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    velocity.x = steer.x * 4.0
    velocity.z = steer.y * 4.0
    if not is_on_floor():
        velocity += get_gravity() * delta
    move_and_slide()
```

Use a recent Godot 4 release with `get_gravity()`. The camera faces along negative Z by default, so pressing up moves forward. The visitor's collider determines where it stands.

## Make the perimeter solid

Add four low walls as static bodies with box colliders and matching visual meshes. Use different wall colours so you can tell which direction the visitor is facing. Run the scene and walk the perimeter.

## Practice and check

Temporarily disable a wall's collider. The visitor can cross that wall and fall off the floor. Restore it, then check every wall and corner. Describe the separate roles of the mesh, collision shape and camera.

## Sources

Original lesson text and examples. The following references informed this course.

- Juan Linietsky, Ariel Manzur and the Godot Engine community, [CharacterBody3D](https://docs.godotengine.org/en/stable/classes/class_characterbody3d.html) · [CC BY 3.0](https://docs.godotengine.org/en/stable/about/faq.html).
