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
- `.github/CODEOWNERS` names the maintainer as owner of every file, so
  the `main` ruleset can require a code-owner review.
- The Node.js floor is 22.12 (`engines` in `package.json`), the floor
  `commander` 15 declares; 22.0 to 22.11 are outside that dependency's
  supported range.

### Fixed

- Seven Markdown, YAML and JSONC files that did not match the
  repository's prettier style are formatted.
- The release workflow's notes list the SHA-256 of every asset attached
  to the release, `SHA256SUMS` included; 0.0.22's notes listed only the
  tarball.
- AGENTS.md says the package is on npm since 0.0.22 instead of "once
  released", and links ADR 0001 on the core's `main` branch.
- SECURITY.md names the pushes and pull requests that run the audit,
  instead of "every push".

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
