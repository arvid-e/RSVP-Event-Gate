const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  eslint.configs.recommended,

  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
      parser: parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  prettierConfig,
];
