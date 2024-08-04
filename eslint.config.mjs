import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    files: ['src/**/*.js'],
  },
  pluginJs.configs.recommended,
];
