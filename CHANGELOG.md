<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Changelog

All notable changes to this project are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions
advance in `0.0.1` steps in lockstep with the jspassgen suite.

## [0.0.22] - Unreleased

The planned first version, at the jspassgen suite's first lockstep
version. Not published.

### Added

- The `jspassgen` bin: `--version`, and `generate` for a strong password
  (`--length`, `--iteration`, `--separator`) from
  `@sebastienrousseau/jspassgen` 0.0.20, pinned exactly.
- Tests that run the bin, at 100% coverage, and a test that `bin/` and
  `src/` import no network module.
- The repository standard: community files, REUSE licensing, the
  `make check` gate, and the CI, CodeQL, DCO, docs-lint and OpenSSF
  Scorecard workflows with actions pinned by commit SHA.
