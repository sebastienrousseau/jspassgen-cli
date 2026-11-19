<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Changelog

All notable changes to this project are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions
advance in `0.0.1` steps in lockstep with the jspassgen suite.

## [0.0.23] - Unreleased

### Added

- Property-based tests with fast-check that drive the commander program
  with generated input: integer option parsing, the exact shape of every
  generated password (chunks, length, separator) and the rejection of
  out-of-range options with nothing printed. They run in `npm test` and
  answer the OpenSSF Scorecard Fuzzing check.

### Changed

- The prettier gate (`npm run format:check`, `make format-check`) now
  checks every file type prettier supports, not only JavaScript.

### Fixed

- Seven Markdown, YAML and JSONC files that did not match the
  repository's prettier style are formatted.

## [0.0.22] - 2026-11-18

The first version, at the jspassgen suite's first lockstep version.

### Added

- The `jspassgen` bin: `--version`, and `generate` for a strong password
  (`--length`, `--iteration`, `--separator`) from
  `@sebastienrousseau/jspassgen` 0.0.22, pinned exactly.
- Tests that run the bin, at 100% coverage, and a test that `bin/` and
  `src/` import no network module.
- The repository standard: community files, REUSE licensing, the
  `make check` gate, and the CI, CodeQL, DCO, docs-lint and OpenSSF
  Scorecard workflows with actions pinned by commit SHA.
