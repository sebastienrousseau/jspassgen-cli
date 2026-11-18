# SPDX-License-Identifier: Apache-2.0 OR MIT
#
# `make check` is the gate: the locked install, eslint (with the
# complexity ceilings), the prettier check, and the tests at 100% line,
# branch, function and statement coverage. CI runs the same targets.

NPM ?= npm

.PHONY: check install lint format format-check test audit demo clean

check: install lint format-check test

install:
	$(NPM) ci

lint:
	$(NPM) run lint

format:
	$(NPM) run format

format-check:
	$(NPM) run format:check

test:
	$(NPM) test

# npm audit over every locked dependency, development tools included.
audit:
	$(NPM) audit --audit-level=low

# Render .github/demo.gif with vhs from the checkout; no network.
demo:
	@command -v vhs >/dev/null 2>&1 || { echo "demo: vhs not found (https://github.com/charmbracelet/vhs)"; exit 1; }
	vhs .github/demo.tape

clean:
	rm -rf coverage
