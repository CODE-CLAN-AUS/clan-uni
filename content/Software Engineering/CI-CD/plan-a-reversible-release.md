---
title: "Plan a Reversible Release"
description: "Design a small release around acceptance criteria, verified artifacts and an explicit rollback exercise."
tags: ["Continuous delivery","release engineering"]
author: CODE CLAN University
github: CODE-CLAN-AUS
---

Design a small release around acceptance criteria, verified artifacts and an explicit rollback exercise.

<!--more-->

**Prerequisites** — Familiarity with a build pipeline and software versioning. Use a fictional service or local staging folder.

## Define the change and its acceptance checks

A community room directory will show wheelchair access information. Define observable checks before building. An accessible room shows its status, a room with unknown status shows “Access information unavailable” and the directory still lists both rooms. Assign a reviewer and put these checks in a release note.

## Promote a verified artifact

Build once and give the result an immutable ID such as a commit SHA plus a checksum. Run automated checks against that artifact and deploy the same file to staging. Verify the acceptance checks and record the deployed ID. Separating approval from rebuilding helps keep production on the tested artifact.

## Rehearse recovery

In a scratch directory create `release-a/index.html` and `release-b/index.html` with different visible version labels. Copy A to a `staging` folder, verify its label, and then copy B there. Simulate a failed smoke check by treating a missing acceptance string in B as a failure. Restore A and verify the label and smoke check again. Retain both source artifacts so this exercise never requires reconstructing a release.

## Practice and check

Write the deploy and rollback checklist with a condition that triggers rollback and a way to verify recovery. Include the case where B changes a database schema. Propose an additive change that lets A and B both run during the rollout.

## Sources

Original lesson text and examples. The following references informed this course.

- GitHub Docs contributors, [Deploying with GitHub Actions](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/control-deployments) · [GitHub Docs license](https://github.com/github/docs/blob/main/LICENSE).
