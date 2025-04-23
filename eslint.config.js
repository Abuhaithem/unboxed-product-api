const { resolve } = require("node:path");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = [
  {
    files: ["**/*.{ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project,
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: ["only-warn", "import"],
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "import/no-named-as-default": 0,
      "import/namespace": 0,
      "import/default": 0,
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "{express,axios}",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["express"],
          "newlines-between": "always",
        },
      ],
      "prettier/prettier": "warn",
    },
    ignores: ["node_modules/", "dist/", "**/*.js"],
  },
];
