<!-- SPDX-License-Identifier: Apache-2.0 OR MIT -->

# Security Policy

## Supported versions

The latest release is `0.0.24`, the jspassgen suite's third lockstep
version. While pre-`1.0`, the latest released `0.0.x` receives security
fixes; older `0.0.x` versions do not.

| Version  | Status         | Receives security fixes? |
| :------- | :------------- | :----------------------- |
| `0.0.24` | Latest release | Yes                      |
| `0.0.23` | Superseded     | No                       |
| `0.0.22` | Superseded     | No                       |
| `main`   | In development | Yes                      |

## Reporting a vulnerability

**Do not open a public issue for security reports.**

Use GitHub Private Vulnerability Reporting:
<https://github.com/sebastienrousseau/jspassgen-cli/security/advisories/new>.
The maintainer is notified automatically. A vulnerability in password
generation itself belongs to the core library:
<https://github.com/sebastienrousseau/jspassgen/security/advisories/new>.

Please include a description and its impact, a minimal reproducer
(preferably a failing test), the commit or version affected, and any
proposed fix. Never include a real password.

These are goals, not guarantees: the project is maintained in a personal
capacity, with no SLA. **Acknowledgement**: the goal is within 5 working
days. **Triage**: a severity assessment and remediation plan after
acknowledgement.

## Security posture

### Scope

The CLI parses its arguments, asks `@sebastienrousseau/jspassgen` for a
password and prints it to standard output. It has no generation logic
and no random source of its own.

### Threat model

| Surface               | How it is handled                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------------------- |
| **Randomness**        | The library's Node.js adapter: `crypto.randomInt` and `crypto.randomBytes`. Never `Math.random()`. |
| **Network**           | None. No network call and no telemetry; a test fails if `bin/` or `src/` imports a network module. |
| **Secrets at rest**   | None written. The password goes to standard output only; no file, log or clipboard.                |
| **Secrets in errors** | Error messages are the library's validation messages about the options, never a generated value.   |
| **Dependency drift**  | The core library is pinned to one exact version; `package-lock.json` pins the rest.                |

### Dependency audit

`make audit` runs `npm audit` over the locked dependencies, development
tools included; CI runs it on every push to `main` and `feat/*` and on
every pull request into `main`. A dependency with a published
advisory is constrained in `package.json` `overrides` so no affected
version resolves. Dependabot proposes weekly updates of npm packages and
of the pinned workflow actions.
