import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,js}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022
      },
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      // Allow any type for development
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow unused variables that start with underscore
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      // Other rules
      "no-console": "off",
      "prefer-const": "warn"
    }
  }
);
