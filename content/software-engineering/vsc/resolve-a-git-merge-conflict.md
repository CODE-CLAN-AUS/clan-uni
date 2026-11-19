---
title: "Resolve a Git Merge Conflict"
description: "Reconcile two conflicting edits and verify the final merge commit."
tags: ["Git","collaboration"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Reconcile two conflicting edits and verify the final merge commit.

<!--more-->

**Prerequisites** — Git basics and a new scratch repository with a configured author.

## Make two independent edits

Run `git init -b main`. Commit `hours.txt` containing the single line `Open Saturday`. Create `morning` with `git switch -c morning`. Replace the line with `Open Saturday at 09:00`, then stage and commit. Switch back to `main` and replace the original line with `Open Saturday until 17:00`. Stage and commit that edit too.

## Inspect the conflict

On `main`, run `git merge morning`. Git should stop and mark `hours.txt` conflicted because both branches changed the same line. Run `git status` and open the file. The markers delimit the `HEAD` version and the incoming version.

## Resolve meaning and complete

The two facts can coexist. Replace the entire conflict block with `Open Saturday 09:00–17:00`, save, and run the following commands.

```bash
git add hours.txt
git diff --cached -- hours.txt
git commit -m "Combine Saturday opening and closing hours"
git log --graph --oneline --all
```

The graph should show both lines of development meeting at the merge.

## Practice and check

Create a second conflict in a fresh copy. Before resolving it, use `git merge --abort` and verify the pre-merge version is restored. Repeat the merge and resolve it. Confirm the final file contains no conflict markers and keeps both intended facts.

## Sources

Original lesson text and examples. The following references informed this course.

- Git contributors, [git-merge](https://git-scm.com/docs/git-merge) · [GPL-2.0 project license](https://github.com/git/git/blob/master/COPYING).
