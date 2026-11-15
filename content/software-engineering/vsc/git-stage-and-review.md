---
title: "Stage and Review a Git Change"
description: "Build a focused commit and inspect exactly what Git will record."
tags: ["Git","version control"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Build a focused commit and inspect exactly what Git will record.

<!--more-->

**Prerequisites** — Git and a text editor. Use a new scratch folder and configure a Git author for its test commits.

## Make a baseline

Run `git init`. Create `menu.txt` with one line, `Soup`. Stage it with `git add menu.txt` and commit with `git commit -m "Add lunch menu"`. This gives the branch a known starting snapshot.

## Compare three versions

Add `Salad` to the file. Run `git diff -- menu.txt` to see differences between the working copy and the index. Stage the change with `git add menu.txt`, then append `Dessert` without staging it. Examine both diffs.

```bash
git status --short
git diff -- menu.txt
git diff --cached -- menu.txt
```

The working diff shows Dessert. The staged diff shows Salad. The index records what the next commit will contain.

## Make and inspect a focused commit

Run `git commit -m "Add salad to lunch menu"` and inspect it with `git show -- menu.txt`. The committed snapshot contains Salad while Dessert stays in your working file. Run `git status --short` again to see what remains.

## Practice and check

Add a new file and stage it. Unstage it with `git restore --staged FILE` and confirm it remains on disk as untracked. Commit Dessert separately, then inspect the latest two commits. Both should have titles that explain one change each.

## Sources

Original lesson text and examples. The following references informed this course.

- Git contributors, [git-add](https://git-scm.com/docs/git-add) · [GPL-2.0 project license](https://github.com/git/git/blob/master/COPYING).
- Git contributors, [git-diff](https://git-scm.com/docs/git-diff) · [GPL-2.0 project license](https://github.com/git/git/blob/master/COPYING).
