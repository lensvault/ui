import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import vitest from "@vitest/eslint-plugin";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "coverage/**"] },
  { linterOptions: { reportUnusedDisableDirectives: "error" } },

  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      eqeqeq: "error",
      "no-console": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
      "no-warning-comments": ["error", { terms: ["todo", "fixme", "xxx", "hack"] }],
      "no-restricted-exports": ["error", { restrictDefaultExports: { direct: true } }],
    },
  },

  {
    files: ["**/*.tsx"],
    ...eslintReact.configs["strict-type-checked"],
  },
  { files: ["**/*.tsx"], ...reactHooks.configs.flat["recommended-latest"] },
  // Both plugins cover hooks; react-hooks' versions win so each problem is reported once.
  { files: ["**/*.tsx"], ...eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"] },
  { files: ["**/*.tsx"], ...jsxA11y.flatConfigs.strict },

  { files: ["**/*.test.ts", "**/*.test.tsx"], ...vitest.configs.recommended },

  { files: ["**/*.js"], ...tseslint.configs.disableTypeChecked },
  { files: ["**/*.js"], languageOptions: { globals: globals.node } },
  {
    files: ["**/*.config.{js,ts}"],
    rules: { "no-restricted-exports": "off" },
  },
);
