export default {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn']
  }
};
