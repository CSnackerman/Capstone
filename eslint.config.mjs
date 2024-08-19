import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    name: 'capstone-client-eslint-config',
    files: ['src/client/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    ...js.configs.recommended,
  },
  {
    name: 'capstone-server-eslint-config',
    files: ['src/server/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    ...js.configs.recommended,
  },
];
