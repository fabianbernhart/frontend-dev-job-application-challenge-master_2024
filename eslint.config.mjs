module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  };
  