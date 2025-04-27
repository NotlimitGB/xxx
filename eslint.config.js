import globals from 'globals';
import pluginJs from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier';
import { fixupPluginRules } from '@eslint/compat';

/** @type {import("eslint").Linter.Config[]} */
const config = [
  pluginJs.configs.recommended,
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx}'],
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      'react/display-name': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unsafe': 'off',
      'react/require-render-return': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
    },
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(hooksPlugin),
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  },
  {
    plugins: {
      prettier: eslintPluginPrettierRecommended,
    },
    rules: {
      ...eslintPluginPrettierRecommended.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
    },
  },

  {
    rules: {
      'no-unused-vars': ['warn'],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@mui/*/*/*'],
        },
      ],
    },
  },
];

export default config;
