module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-native', 'react-hooks'],
  env: {
    'react-native/react-native': true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {jsx: true},
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'warn',

    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'prettier/prettier': ['error'],
  },
};
