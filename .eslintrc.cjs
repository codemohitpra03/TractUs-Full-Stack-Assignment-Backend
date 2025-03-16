module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    camelcase: ['error', { properties: 'always' }], // Enforce camelCase naming convention
    eqeqeq: ['error', 'always'], // Require === and !==
    curly: ['error', 'all'], // Enforce consistent brace style for all control statements
    'no-var': 'error', // Require let or const instead of var
    'prefer-const': 'error', // Suggest using const wherever possible
    'no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: false },
    ], // Disallow unused variables
    'no-console': ['warn', { allow: ['info', 'error', 'warn'] }], // Warn about console.log statements
    'no-debugger': 'error', // Disallow debugger statements
    semi: ['error', 'always'], // Require semicolons
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }], // Enforce single quotes
    'prettier/prettier': ['error'],
    'linebreak-style': ['error', 'unix'],
  },
};
