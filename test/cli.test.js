// SPDX-License-Identifier: Apache-2.0 OR MIT

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const bin = fileURLToPath(new URL("../bin/jspassgen.js", import.meta.url));
const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

/**
 * Runs the bin with `args` and resolves its exit code and output.
 *
 * @param {string[]} args
 * @returns {Promise<{code: number, stdout: string, stderr: string}>}
 */
function jspassgen(...args) {
  return new Promise((resolve) => {
    execFile(process.execPath, [bin, ...args], (error, stdout, stderr) => {
      resolve({ code: error ? error.code : 0, stdout, stderr });
    });
  });
}

const chunk = (length) => `[A-Za-z0-9+/]{${length}}`;

describe("jspassgen bin", () => {
  it("prints the package version with --version", async () => {
    const { code, stdout } = await jspassgen("--version");
    assert.equal(code, 0);
    assert.equal(stdout, `${version}\n`);
  });

  it("generates four 16-character base64 chunks by default", async () => {
    const { code, stdout, stderr } = await jspassgen("generate");
    assert.equal(code, 0);
    assert.equal(stderr, "");
    assert.match(stdout, new RegExp(`^${chunk(16)}(-${chunk(16)}){3}\\n$`));
  });

  it("honours --length, --iteration and --separator", async () => {
    const { code, stdout } = await jspassgen(
      "generate",
      "--length",
      "8",
      "--iteration",
      "3",
      "--separator",
      ".",
    );
    assert.equal(code, 0);
    assert.match(stdout, new RegExp(`^${chunk(8)}(\\.${chunk(8)}){2}\\n$`));
  });

  it("draws a different password on each run", async () => {
    const [first, second] = await Promise.all([
      jspassgen("generate"),
      jspassgen("generate"),
    ]);
    assert.notEqual(first.stdout, second.stdout);
  });

  it("refuses a value that is not a whole number", async () => {
    const { code, stdout, stderr } = await jspassgen("generate", "-l", "1.5");
    assert.equal(code, 1);
    assert.equal(stdout, "");
    assert.match(stderr, /argument '1\.5' is invalid\. Not a whole number\./);
  });

  it("reports the library's validation error and exits 1", async () => {
    const { code, stdout, stderr } = await jspassgen("generate", "-l", "0");
    assert.equal(code, 1);
    assert.equal(stdout, "");
    assert.equal(stderr, "error: Length must be at least 1\n");
  });

  it("rejects a length above the library's maximum", async () => {
    const { code, stderr } = await jspassgen("generate", "-l", "1025");
    assert.equal(code, 1);
    assert.equal(stderr, "error: Length must not exceed 1024\n");
  });
});
