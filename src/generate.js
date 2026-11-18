// SPDX-License-Identifier: Apache-2.0 OR MIT

/**
 * Password generation, delegated entirely to @sebastienrousseau/jspassgen.
 *
 * This module adds no generation logic of its own: it builds the core
 * service with the library's Node.js CSPRNG adapter (crypto.randomInt and
 * crypto.randomBytes) and passes the options through.
 *
 * @module generate
 */

import { createService } from "@sebastienrousseau/jspassgen/core";
import { NodeCryptoRandom } from "@sebastienrousseau/jspassgen/adapters/node";

const service = createService({}, { randomGenerator: new NodeCryptoRandom() });

/**
 * Generates a strong password: base64 characters from the platform
 * CSPRNG, in `iteration` chunks of `length` characters joined by
 * `separator`.
 *
 * @param {{length: number, iteration: number, separator: string}} options
 * @returns {Promise<string>} The password.
 * @throws {Error} When the library rejects the options.
 */
export function generateStrong({ length, iteration, separator }) {
  return service.generate({ type: "strong", length, iteration, separator });
}
