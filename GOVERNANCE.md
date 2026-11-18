<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Governance

How jspassgen-cli is run, who decides, and what happens if the
maintainer is unavailable.

## Scope

jspassgen-cli is the command line of the jspassgen suite. It carries no
generation logic; changes are weighed against that: the same results as
the core library, security and clarity over feature breadth.

## Roles

| Role | Who | Responsibilities |
| :--- | :--- | :--- |
| **Maintainer** | Sebastien Rousseau (single maintainer) | Reviews and merges pull requests, cuts and signs releases, triages issues and security reports, sets direction, holds the repository's admin rights |
| **Contributor** | Anyone with a merged pull request | Proposes changes with tests, reviews others' pull requests |
| **User** | Everyone | Reports bugs, asks questions, requests features through issues |

## Decisions

- **Day-to-day changes** (fixes, tests, docs, additive options within
  scope) land on the release branch `feat/v<next-version>`; the
  maintainer merges its pull request into `main` once CI is green.
- **Significant changes** (a breaking change to the command line, a new
  dependency, a change to the version line) start as an issue.
- **The suite version** is decided for the whole jspassgen family: this
  package moves in lockstep with jspassgen, one `0.0.1` step at a time.

Every change passes the CI gates (lint, complexity, format, 100%
coverage on Node.js 22 and 24, the dependency audit, CodeQL, the DCO
check) before merge. At most one pull request targets `main` at a time:
the release branch.

## Releases

Releases are cut by the maintainer from a signed annotated `v<version>`
tag, as [DEVELOPMENT.md](DEVELOPMENT.md#release-model) describes. Only
the maintainer pushes tags.

## Access continuity

- **Code and history** are public on GitHub; anyone can fork and build
  from them. Commits and tags are signed ([KEYS.asc](KEYS.asc)).
- **No secret is needed to build or test.**
- **If the maintainer is unreachable** for 90 days, the project should
  be treated as unmaintained: users should pin a release, and a fork may
  continue it under a new name. Adding a second maintainer is a standing
  goal.

## Code of conduct

Everyone in the project follows [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
