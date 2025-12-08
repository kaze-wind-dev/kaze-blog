import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
  },
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
  },
    {
    files: ["**/*.astro"],
    languageOptions: {
      parser: await import("astro-eslint-parser").then(m => m.default),
      parserOptions: {
        parser: await import("@typescript-eslint/parser").then(m => m.default),
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**", "public/**"],
  },
];
