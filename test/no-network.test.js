// SPDX-License-Identifier: Apache-2.0 OR MIT

import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const network =
  /\b(?:node:)?(?:http2?|https|net|dgram|tls|dns)["']|\bfetch\s*\(|\bWebSocket\b/;

describe("no network access in this package", () => {
  for (const dir of ["bin", "src"]) {
    for (const file of readdirSync(join(root, dir))) {
      it(`${dir}/${file} imports no network module`, () => {
        const source = readFileSync(join(root, dir, file), "utf8");
        assert.doesNotMatch(source, network);
      });
    }
  }
});
