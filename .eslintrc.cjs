module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:eslint-comments/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: { node: true },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: { sourceType: "script" },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    "no-undef": 0,
    "no-shadow": "off",
    "arrow-body-style": 2,
    "@typescript-eslint/no-shadow": ["error"],
    "import/order": [
      2,
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
};
