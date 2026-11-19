// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * Property-based tests of the command line, with fast-check. They drive
 * the real commander program in process, with generated arguments, and
 * check what a user relies on: which option values are accepted, the
 * exact shape of every generated password, and that a rejected option
 * prints nothing to standard output.
 */

import assert from "node:assert/strict";
import { InvalidArgumentError } from "commander";
import fc from "fast-check";
import { buildProgram, parseInteger } from "../src/cli.js";

const BASE64 = /^[A-Za-z0-9+/]+$/;

/**
 * Runs `jspassgen generate` in process with `args` and collects what it
 * writes to standard output.
 *
 * @param {string[]} args - The arguments after `generate`.
 * @returns {Promise<string>} Everything written to standard output.
 */
async function generate(args) {
  let stdout = "";
  const program = buildProgram({
    write: (text) => {
      stdout += text;
    },
  });
  try {
    await program.parseAsync(["generate", ...args], { from: "user" });
  } catch (error) {
    error.stdout = stdout;
    throw error;
  }
  return stdout;
}

/**
 * Asserts that `password` is `iteration` base64 chunks of `length`
 * characters, each pair joined by exactly `separator`. Positions are
 * computed rather than split, so a separator made of base64 characters,
 * or an empty one, is still checked exactly.
 */
function assertShape(password, { length, iteration, separator }) {
  const stride = length + separator.length;
  assert.equal(password.length, stride * iteration - separator.length);
  for (let k = 0; k < iteration; k += 1) {
    const start = k * stride;
    assert.match(password.slice(start, start + length), BASE64);
    if (k < iteration - 1) {
      assert.equal(password.slice(start + length, start + stride), separator);
    }
  }
}

/** Option values a lenient Number() would accept but the CLI must not. */
const notWholeNumbers = fc.oneof(
  fc.constant(""),
  fc.integer({ max: -1 }).map(String),
  fc.integer({ min: 0, max: 1e6 }).map((n) => `${n}.5`),
  fc.nat().map((n) => ` ${n}`),
  fc.nat().map((n) => `${n} `),
  fc.nat().map((n) => `+${n}`),
  fc.nat().map((n) => `0x${n.toString(16)}`),
  fc.nat({ max: 9 }).map((n) => `${n}e1`),
  fc.nat().map((n) => `${n}n`),
);

/**
 * Asserts that `jspassgen generate` with `args` fails with `message` and
 * writes nothing to standard output.
 *
 * @param {string[]} args - The arguments after `generate`.
 * @param {string} message - The library's validation message.
 */
async function assertRejected(args, message) {
  await assert.rejects(generate(args), (error) => {
    assert.equal(error.message, message);
    assert.equal(error.stdout, "");
    return true;
  });
}

const lengths = fc.integer({ min: 1, max: 1024 });
const iterations = fc.integer({ min: 1, max: 16 });
const separators = fc.string({ maxLength: 8, unit: "binary" });

describe("jspassgen option parsing (fast-check)", () => {
  it("parses every decimal digit string as its integer value", () => {
    fc.assert(
      fc.property(fc.nat({ max: 3 }), fc.maxSafeNat(), (zeros, n) => {
        const text = `${"0".repeat(zeros)}${n}`;
        assert.equal(parseInteger(text), n);
      }),
    );
  });

  it("refuses option values that are not plain whole numbers", () => {
    fc.assert(
      fc.property(notWholeNumbers, (text) => {
        assert.throws(() => parseInteger(text), InvalidArgumentError);
      }),
    );
  });
});

describe("jspassgen generate output (fast-check)", () => {
  it("prints iteration base64 chunks of length joined by separator", async () => {
    await fc.assert(
      fc.asyncProperty(
        lengths,
        iterations,
        separators,
        async (length, iteration, separator) => {
          const stdout = await generate([
            `--length=${length}`,
            `--iteration=${iteration}`,
            `--separator=${separator}`,
          ]);
          assert.ok(stdout.endsWith("\n"));
          assertShape(stdout.slice(0, -1), { length, iteration, separator });
        },
      ),
      { numRuns: 200 },
    );
  });

  it("rejects a length above 1024 and prints no password", async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 1025 }), (length) =>
        assertRejected([`--length=${length}`], "Length must not exceed 1024"),
      ),
    );
  });

  it("rejects a zero length whatever the other options", async () => {
    await fc.assert(
      fc.asyncProperty(iterations, separators, (iteration, separator) =>
        assertRejected(
          [
            "--length=0",
            `--iteration=${iteration}`,
            `--separator=${separator}`,
          ],
          "Length must be at least 1",
        ),
      ),
    );
  });

  it("rejects a zero iteration whatever the other options", async () => {
    await fc.assert(
      fc.asyncProperty(lengths, separators, (length, separator) =>
        assertRejected(
          [`--length=${length}`, "--iteration=0", `--separator=${separator}`],
          "Iteration must be a positive integer",
        ),
      ),
    );
  });
});
