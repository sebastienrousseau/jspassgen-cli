// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * The `jspassgen` command line: argument parsing and output only.
 *
 * @module cli
 */

import { readFileSync } from "node:fs";
import { Command, InvalidArgumentError } from "commander";
import { generateStrong } from "./generate.js";

const { version } = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
);

/**
 * Parses a decimal integer option value, refusing anything else.
 *
 * @param {string} value - The raw option value.
 * @returns {number} The integer.
 * @throws {InvalidArgumentError} When the value is not a whole number.
 */
export function parseInteger(value) {
  if (!/^\d+$/.test(value)) {
    throw new InvalidArgumentError("Not a whole number.");
  }
  return Number(value);
}

/**
 * Builds the program.
 *
 * @param {{write: (text: string) => void}} out - Where passwords go.
 * @returns {Command} The configured commander program.
 */
export function buildProgram(out) {
  const program = new Command();
  program
    .name("jspassgen")
    .description(
      "Generate passwords on this machine with @sebastienrousseau/jspassgen.",
    )
    .version(version)
    .showHelpAfterError();

  program
    .command("generate")
    .description("generate a strong password from the platform CSPRNG")
    .option("-l, --length <n>", "characters per chunk", parseInteger, 16)
    .option("-i, --iteration <n>", "number of chunks", parseInteger, 4)
    .option("-s, --separator <text>", "text between chunks", "-")
    .action(async (options) => {
      out.write(`${await generateStrong(options)}\n`);
    });

  return program;
}

/**
 * Runs the program and turns a library error into a message and exit
 * code 1. Commander handles its own usage errors.
 *
 * @param {string[]} argv - The full process.argv.
 * @returns {Promise<void>}
 */
export async function run(argv) {
  const program = buildProgram(process.stdout);
  try {
    await program.parseAsync(argv);
  } catch (error) {
    process.stderr.write(`error: ${error.message}\n`);
    process.exitCode = 1;
  }
}
