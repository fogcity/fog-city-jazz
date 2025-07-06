module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
    },
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "astro/no-deprecated-getentrybyslug": "off",
  },
}
