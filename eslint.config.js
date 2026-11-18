// SPDX-License-Identifier: Apache-2.0 OR MIT
//
// Flat config. Besides the recommended rules it enforces the complexity
// ceilings of ~/Code/AGENTS.md section 0 on every function: cyclomatic
// 10, cognitive 15, 60 lines per function and 500 lines per file.
// Halstead difficulty (ceiling 30) has no ESLint rule; see DEVELOPMENT.md.

import js from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";

export default [
  {
    ignores: ["coverage/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    plugins: { sonarjs },
    rules: {
      complexity: ["error", 10],
      "sonarjs/cognitive-complexity": ["error", 15],
      "max-lines-per-function": ["error", { max: 60 }],
      "max-lines": ["error", { max: 500 }],
      eqeqeq: "error",
      curly: "error",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: { ...globals.mocha },
    },
  },
];
