<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

<p align="center">
  <img src="https://raw.githubusercontent.com/sebastienrousseau/jspassgen/master/.github/assets/logo.svg" alt="jspassgen logo" width="128" />
</p>

<h1 align="center">jspassgen-cli</h1>

<p align="center">
  The jspassgen command line: strong passwords generated on your machine from the platform CSPRNG, with all generation done by the @sebastienrousseau/jspassgen library.
</p>

<p align="center">
  <a href="https://github.com/sebastienrousseau/jspassgen-cli/actions"><img src="https://img.shields.io/github/actions/workflow/status/sebastienrousseau/jspassgen-cli/ci.yml?style=for-the-badge&logo=github" alt="Build" height="28" /></a>
  <a href="https://www.npmjs.com/package/@sebastienrousseau/jspassgen-cli"><img src="https://img.shields.io/badge/npm-not%20published%20yet-lightgrey?style=for-the-badge&color=fc8d62&logo=npm" alt="npm: not published yet" height="28" /></a>
  <a href="https://github.com/sebastienrousseau/jspassgen-cli/blob/main/DEVELOPMENT.md"><img src="https://img.shields.io/badge/docs-development-blue?style=for-the-badge&labelColor=555555&logo=readthedocs" alt="Docs" height="28" /></a>
  <a href="https://scorecard.dev/viewer/?uri=github.com/sebastienrousseau/jspassgen-cli"><img src="https://img.shields.io/ossf-scorecard/github.com/sebastienrousseau/jspassgen-cli?style=for-the-badge&label=OpenSSF%20Scorecard&logo=openssf" alt="OpenSSF Scorecard" height="28" /></a>
  <a href="LICENSE-APACHE"><img src="https://img.shields.io/badge/license-Apache--2.0%20OR%20MIT-blue.svg?style=for-the-badge" alt="License: Apache-2.0 OR MIT" height="28" /></a>
  <a href="#requirements"><img src="https://img.shields.io/badge/Node.js-22%2B-93450a.svg?style=for-the-badge&logo=node.js" alt="Node.js 22 or newer" height="28" /></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/sebastienrousseau/jspassgen-cli/main/.github/demo.gif" alt="The jspassgen bin from a checkout: it prints its version, generates a strong password of four 16-character chunks, then one of three 12-character chunks separated by dots" width="100%" />
</p>

---

## Contents

**Getting started**

- [Install](#install): from a checkout; not on npm yet
- [Requirements](#requirements): Node.js floor, platforms
- [Quick Start](#quick-start): print the version and generate a password

**The jspassgen ecosystem**

- [The jspassgen ecosystem](#the-jspassgen-ecosystem): the core library, its tools and native SDKs, released in lockstep

**Library reference**

- [Capabilities at a glance](#capabilities-at-a-glance): what the bin does today, and what it does not yet
- [Ecosystem comparison](#ecosystem-comparison): this bin against the one inside jspassgen
- [Benchmarks](#benchmarks): none yet, and why
- [Features](#features): the current surface
- [Configuration](#configuration): the `generate` options
- [Examples](#examples): command lines

**Operational**

- [When not to use jspassgen-cli](#when-not-to-use-jspassgen-cli): limitations
- [Development](#development): make targets and CI
- [Security](#security): randomness, network and data handling
- [Documentation](#documentation): all reference docs
- [Stability guarantees](#stability-guarantees): version axis and toolchain floor
- [License](#license)

---

## Install

### As a JavaScript library

This package is a command line, not a library: it exports no API, and
programs should depend on
[`@sebastienrousseau/jspassgen`](https://www.npmjs.com/package/@sebastienrousseau/jspassgen)
directly.

`@sebastienrousseau/jspassgen-cli` is **not on npm yet**. It is a planned
member of the jspassgen suite and will first ship at the suite's first
lockstep version (planned: 0.0.22). Until then, `package.json` is marked
`private` and the bin runs from a checkout:

```sh
git clone https://github.com/sebastienrousseau/jspassgen-cli.git
cd jspassgen-cli
npm ci
node bin/jspassgen.js --version
```

---

## Requirements

- Node.js 22 or newer (`engines` in `package.json`). CI runs the tests on
  Node.js 22 and 24 on Ubuntu 24.04. The code is plain ESM JavaScript
  with no native modules.
- Run-time dependencies: `@sebastienrousseau/jspassgen` (pinned to
  exactly 0.0.20, its latest published release) and `commander`.

---

## Quick Start

```sh
node bin/jspassgen.js --version
node bin/jspassgen.js generate
node bin/jspassgen.js generate --length 12 --iteration 3 --separator .
```

`--version` prints this package's version. `generate` prints one strong
password: `--iteration` chunks of `--length` base64 characters (16 and 4
by default), joined by `--separator` (`-` by default). The characters
come from the library's strong generator over Node.js `crypto`; the
CLI only parses arguments and prints the result. An option the library
rejects (for example `--length 0`) prints the library's message on
standard error and exits with status 1.

---

## The jspassgen ecosystem

jspassgen is one core library and the tools and SDKs around it. Every
member is listed in
[`docs/ecosystem.json`](https://github.com/sebastienrousseau/jspassgen/blob/master/docs/ecosystem.json)
and, from the first suite release, every member ships the same version
([ADR 0001](https://github.com/sebastienrousseau/jspassgen/blob/master/docs/adr/0001-ecosystem-lockstep.md)).
The JavaScript tools depend on the core and add no generation logic of
their own; the SDKs are native ports proven by a conformance kit.

| Component | Purpose | Use case |
| :--- | :--- | :--- |
| [`jspassgen`][core] | Core library: password and passphrase generation, entropy accounting, the current CLI and web UI | Programs that generate secrets; the source every other member follows |
| **`jspassgen-cli`** | This command line, built on the core (planned) | Generating passwords in a terminal or a script |
| `jspassgen-mcp` | Local stdio MCP server (planned) | AI agents that need a generated secret |
| `jspassgen-lsp` | Language server for weak literal secrets (planned) | Editors checking configuration and `.env` files |
| `jspassgen-sdk-python`, `-rust`, `-java`, `-dotnet`, `-cpp` | Native ports of the core (planned) | Other languages, same rules |
| [jspassgen.com][site] | Product site | Evaluating the suite |

---

## Capabilities at a glance

| Area | Capability | Status |
| :--- | :--- | :--- |
| Version | `--version` | Available |
| Generation | `generate`: strong password (base64 characters, chunks, separator) | Available |
| Other password types | base64, memorable, diceware, quantum-resistant, honeyword, pronounceable, custom | Not available yet; in the jspassgen bin today |
| Entropy and strength | Entropy report, strength analysis | Not available yet |
| Presets, clipboard, interactive onboarding | The rest of jspassgen's `src/cli` | Not available yet; moves here in a later version |
| Distribution | npm package, release archives, `SHA256SUMS` | Not available yet; no release workflow in this repository |

---

## Ecosystem comparison

Today the full command line still lives in jspassgen. This repository is
where it moves: when it ships, the `jspassgen` bin in the core package
becomes a shim that names this package, and is removed one release later
(ADR 0001).

| Project | Password types | Published on npm | Generation code |
| :--- | :---: | :---: | :---: |
| **jspassgen-cli** | **strong only, for now** | **Not yet** | **None; calls the core** |
| `jspassgen` bin in `@sebastienrousseau/jspassgen` | All eight | Yes (0.0.20) | In the same package |

---

## Benchmarks

None. The CLI does no generation of its own, so a benchmark here would
measure Node.js start-up and the core library; the core's benchmarks
live in [jspassgen][core].

---

## Features

- **One command, `generate`**, for a strong password from the library's
  `strong` type, with `--length`, `--iteration` and `--separator`.
- **`--version`** prints the version from `package.json`.
- **Strict integers.** `--length` and `--iteration` accept whole numbers
  only; anything else is a usage error before the library is called.
- **Library errors pass through.** Validation (lengths from 1 to 1024,
  at least one chunk) is the library's, and so are its messages.

---

## Configuration

`jspassgen generate` options:

| Option | Default | Meaning |
| :--- | :--- | :--- |
| `-l, --length <n>` | 16 | Characters per chunk, 1 to 1024 |
| `-i, --iteration <n>` | 4 | Number of chunks, at least 1 |
| `-s, --separator <text>` | `-` | Text between chunks |

The CLI reads no configuration file and no environment variable.

---

## Examples

```sh
# A 64-character password in four chunks: the defaults
node bin/jspassgen.js generate

# One chunk of 32 characters, no separator needed
node bin/jspassgen.js generate --length 32 --iteration 1

# Into a shell variable, without echoing it
secret="$(node bin/jspassgen.js generate)"
```

---

## When not to use jspassgen-cli

- **You need anything but a strong password today.** Passphrases,
  memorable passwords and the other types are in the jspassgen bin until
  the CLI moves here.
- **You want to install from npm.** This package is not published yet;
  `npx @sebastienrousseau/jspassgen` runs the current CLI.
- **You are writing a program.** Depend on `@sebastienrousseau/jspassgen`
  and call its API; spawning a CLI to get a secret adds a process and a
  pipe for nothing.

---

## Development

```sh
mise install   # Node.js 24 (mise.toml)
make check     # npm ci, eslint, prettier, the tests at 100% coverage
```

`make check` is the local gate and what CI runs on Node.js 22 and 24.
`make audit` runs `npm audit`, and `make demo` re-renders the GIF above
with [VHS](https://github.com/charmbracelet/vhs).
[`DEVELOPMENT.md`](DEVELOPMENT.md) maps every CI gate to its command.

---

## Security

Randomness comes from the library's Node.js adapter, which uses
`crypto.randomInt` and `crypto.randomBytes`; this package has no random
source of its own and never uses `Math.random()`. The CLI makes no
network call, sends no telemetry and writes no file: the password goes
to standard output only. A test fails if `bin/` or `src/` imports a
network module. Dependencies are audited with `npm audit` in CI, and
advisories are constrained in `package.json` `overrides`.

Report vulnerabilities according to [`SECURITY.md`](SECURITY.md).

---

## Documentation

[Developer docs](DEVELOPMENT.md) ·
[Family map](#the-jspassgen-ecosystem) ·
[Ecosystem ADR](https://github.com/sebastienrousseau/jspassgen/blob/master/docs/adr/0001-ecosystem-lockstep.md)

Also: [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md) ·
[Governance](GOVERNANCE.md) · [Support](SUPPORT.md) ·
[Security policy](SECURITY.md) · [Agent rules](AGENTS.md)

No user manual or API reference is published yet: the package has one
command and no API.

---

## Stability guarantees

The project is pre-1.0 and versions advance in `0.0.1` steps, in
lockstep with the jspassgen suite from its first release. The breaking
axis is the command line: a removed or renamed command or option, a
changed default, or a different output format for the same options is
breaking and the changelog calls it out. Passwords are random, so their
values are not part of the contract; their shape (alphabet, chunk count
and length, separator) is. The core version is pinned exactly, so a
release of this package always runs the generator it was tested with.
The Node.js floor is 22 (`engines`); it is raised only in a new version,
recorded in the changelog.

---

## License

This project is dual-licensed under either:

- Apache License, Version 2.0 ([`LICENSE-APACHE`](LICENSE-APACHE) or <https://www.apache.org/licenses/LICENSE-2.0>)
- MIT License ([`LICENSE-MIT`](LICENSE-MIT) or <https://opensource.org/licenses/MIT>)

at your option. Dependencies keep their own licences:
`@sebastienrousseau/jspassgen` (Apache-2.0 OR MIT) and `commander` (MIT).

[core]: https://github.com/sebastienrousseau/jspassgen
[site]: https://jspassgen.com
