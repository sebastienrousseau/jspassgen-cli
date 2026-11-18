<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Contributing

Thanks for looking. This package is the command line of the jspassgen
suite. Password generation belongs in the core library
([`jspassgen`](https://github.com/sebastienrousseau/jspassgen)); a change
here should make the command line more correct, safer or easier to use.

## Before you open a pull request

Everything CI checks, you can run locally (`mise install` provides
Node.js):

```sh
make check   # npm ci, eslint, prettier, tests at 100% coverage
make audit   # npm audit
```

## The README demo

`make demo` renders `.github/demo.gif` from `.github/demo.tape` with
[VHS](https://github.com/charmbracelet/vhs) (it needs `vhs`, `ttyd` and
`ffmpeg`). It runs the bin from the checkout and needs no network.
Re-render the GIF in the same change as anything that alters what it
shows.

## Rules

- **No generation logic.** Call `@sebastienrousseau/jspassgen`; a missing
  capability is added there first.
- **No network, no telemetry.** The bin makes no network call and writes
  only to standard output and standard error.
- **Complexity ceilings.** Every function stays within cyclomatic 10,
  cognitive 15 and 60 lines, and every file within 500 lines
  (`npm run lint`).
- **100% coverage.** `npm test` fails below 100% of lines, branches,
  functions and statements in `bin/` and `src/`; add the test with the
  code.
- **No suppressions.** Fix the cause rather than adding
  `eslint-disable`; a justified exception is a specific inline rule with
  a reason.
- **Tests with the change**, in the same commit.

## Commits

Conventional commits (`feat:`, `fix:`, `docs:`, `ci:`, `test:`,
`chore:`), an imperative subject of at most 50 characters, and a body
wrapped at 72 characters that explains what and why. Every commit
carries a `Signed-off-by:` trailer (`git commit -s`), which certifies
the [DCO](DCO.txt), and is signed.

## Versioning

The version lives in `package.json` and is restated in the files
[AGENTS.md](AGENTS.md) lists. **Versions increment by 0.0.1**, in
lockstep with the suite.

## Licence

Apache-2.0 OR MIT, at your option. By contributing you agree your work is
released under the same dual grant.
