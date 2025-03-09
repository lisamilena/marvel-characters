import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  // Tanstack Eslint Plugin Config
  ...pluginQuery.configs['flat/recommended'],
  // Base config: Next.js, Prettier, React, ... recommended settings
  ...compat.extends(
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended'
  ),
  // Ignore files/directories
  {
    ignores: ['.next/*', '.yarn/*', '.commitlintrc.js', '.lintstagedrc.js'],
  },
  // Custom language options, settings, and rules
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        {
          ignoreConditionalTests: true,
          ignorePrimitives: { string: true },
        },
      ],
      '@typescript-eslint/unbound-method': 'off',
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/exports-last': 'warn',
      'import/group-exports': 'warn',
      'import/no-default-export': 'error',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/no-extraneous-dependencies': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-useless-path-segments': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*./../.*'],
              message: 'Too many import levels. Please use an absolute import instead!',
            },
          ],
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message:
                'No need to import React! See: https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html',
            },
          ],
        },
      ],
      // Disable base rule in favor of TS rule
      'no-unused-vars': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/hook-use-state': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-pascal-case': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          ignoreCase: true,
          reservedFirst: ['key', 'ref'],
        },
      ],
      'react/no-unused-prop-types': 'error',
      'react/self-closing-comp': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  // Overrides for files in src/{app,pages}/**
  {
    files: [
      'src/{app,pages}/**',
      'eslint.config.mjs',
      'next.config.ts',
      'postcss.config.mjs',
      'vitest.config.ts',
      'src/middleware.ts',
      'src/i18n/request.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];

export default eslintConfig;
