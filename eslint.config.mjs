// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "react/prop-types": 0,
    "indent": [
      "error",
      2,
      {
        "VariableDeclarator": {
          "var": 2,
          "let": 2,
          "const": 3
        },
        "outerIIFEBody": 0,
        "MemberExpression": 1,
        "FunctionDeclaration": { "parameters": "first" }
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "newline-after-var": [
      "error",
      "always"
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      }
    ],
    "no-multi-spaces": [
      "error",
      { "exceptions": { "Property": false } }
    ],
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "array-bracket-newline": [
      "error",
      "consistent"
    ],
    "object-property-newline": [
      "error",
      { "allowAllPropertiesOnSameLine": true }
    ],
    "comma-dangle": [
      "error",
      {
        "functions": "never",
        "objects": "only-multiline",
        "arrays": "only-multiline",
        "imports": "always",
        "exports": "only-multiline"
      }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": { "multiline": true },
        "ObjectPattern": { "multiline": true }
      }
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "no-trailing-spaces": [
      "error"
    ],
    "semi": [
      "error",
      "always"
    ],
    "padded-blocks": [
      "error",
      { "blocks": "never" }
    ],
    "no-multiple-empty-lines": [
      "error",
      { "max": 1 }
    ],
    "no-prototype-builtins": "off",
    "no-multi-str": "off",
    "no-case-declarations": "off"
  }
});
