<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# AGENTS.md

`jspassgen-cli` is the command line of the jspassgen suite, published
on npm as `@sebastienrousseau/jspassgen-cli` (first release 0.0.22) with
the bin `jspassgen`. It exists so the CLI can move out of the core
repository and release on its own track, in lockstep with the suite
([ADR 0001](https://github.com/sebastienrousseau/jspassgen/blob/main/docs/adr/0001-ecosystem-lockstep.md)).
Its value is that a terminal user gets exactly the core library's
generator, with no generation logic of its own to drift. Read
[CONTRIBUTING.md](CONTRIBUTING.md) and [DEVELOPMENT.md](DEVELOPMENT.md)
as well, and the workspace rules in `~/Code/AGENTS.md`.

## Rules

- **No generation logic here.** Every password comes from
  `@sebastienrousseau/jspassgen`; this package parses arguments and
  prints results. Randomness is the library's Node.js CSPRNG adapter;
  never `Math.random()`, never a random source of this package's own.
- **No network, no telemetry, no files.** The bin makes no network call
  and writes only to standard output and standard error;
  `test/no-network.test.js` guards `bin/` and `src/`.
- **Pin the core exactly.** `@sebastienrousseau/jspassgen` is pinned to
  one version, the suite version (now 0.0.24).
- **Version.** `0.0.x`, moving by exactly `0.0.1`, in lockstep with the
  jspassgen suite; never propose a jump. The version lives in
  `package.json` and is restated in `package-lock.json`, `CITATION.cff`,
  `CHANGELOG.md`, `SECURITY.md` and `SUPPORT.md`. Work for the next
  version happens on `feat/v<next-version>`; every other branch,
  Dependabot's included, reaches that branch as commits, never `main`.
  `private: true` was removed for the first release, 0.0.22.
- **Gates.** `make check` must pass: eslint (complexity 10, cognitive
  complexity 15, 60 lines per function, 500 lines per file), prettier,
  and the tests at 100% line, branch, function and statement coverage.
  No blanket suppressions.
- **Commits.** Conventional, signed off (`git commit -s`), SSH-signed,
  with an `Assisted-by:` trailer for agent work. Never rewrite pushed
  history; never merge into `main` without the maintainer.

## The gate

```sh
make check   # npm ci, lint, format check, tests with coverage
make audit   # npm audit
```

## Leave alone

`LICENSE-APACHE`, `LICENSE-MIT`, `LICENSES/`, `DCO.txt` and `KEYS.asc`,
unless the task is to update them. `coverage/` is generated.
