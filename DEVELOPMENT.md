<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Development

## Setup

```sh
mise install   # Node.js 24 (mise.toml); the floor is Node.js 22
npm ci         # the locked dependencies (package-lock.json)
```

## Layout

| Path | What it holds |
| :--- | :--- |
| `bin/jspassgen.js` | The bin: calls `run(process.argv)` |
| `src/cli.js` | The commander program: `--version` and `generate`, integer parsing, error reporting |
| `src/generate.js` | The one call into `@sebastienrousseau/jspassgen`: the core service with the Node.js CSPRNG adapter |
| `test/` | mocha tests that run the bin as a child process, and the no-network check |

## CI gates and their local commands

| CI job | What it checks | Local command |
| :--- | :--- | :--- |
| `ci.yml` lint | eslint with the complexity rules, prettier, `npm audit` | `make lint format-check audit` |
| `ci.yml` test (Node.js 22, 24) | The tests at 100% coverage | `make test` |
| `codeql.yml` | CodeQL for JavaScript and for the workflows | (GitHub only) |
| `docs-lint.yml` | markdownlint, the README template, codespell, REUSE, links | `scripts/readme-check.sh` and the tools named in the workflow |
| `dco.yml` | `Signed-off-by:` on every commit | `git log --format=%B` |
| `scorecard.yml` | OpenSSF Scorecard | (GitHub only) |

`make check` runs `npm ci`, lint, the format check and the tests.

## Coverage

`npm test` runs mocha under c8 and fails below 100% of lines, branches,
functions and statements in `bin/` and `src/` (the `c8` block in
`package.json`). The tests run the bin as a child process; c8 collects
coverage from child processes too.

## Complexity

`eslint.config.js` sets `complexity` (10), `sonarjs/cognitive-complexity`
(15), `max-lines-per-function` (60) and `max-lines` (500). Halstead
difficulty (ceiling 30) has no ESLint rule and is not checked in CI.
Measured by hand with `typhonjs-escomplex` 0.1.0 when the code was
written, the highest per-function value was 6.75.

## Release model

No release workflow exists yet. `package.json` is no longer `private`,
ready for the first release. The first release is the suite's first lockstep version (planned: 0.0.22).
It will follow the suite's release rules: a signed annotated tag
`v<version>` with the message `jspassgen-cli v<version>`, a GitHub
release titled `jspassgen-cli <version>` with a `SHA256SUMS` asset, and
npm trusted publishing from a protected environment.
