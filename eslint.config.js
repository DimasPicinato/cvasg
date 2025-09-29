import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importHelpers from 'eslint-plugin-import-helpers';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'import-helpers': importHelpers,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/react/',
            'module',
            ['parent', 'sibling', 'index'],
            '/@types/',
            '/assets/',
            '/schemas/',
            '/lib/',
            '/utils/',
            '/components/@shadcn/',
            '/components/',
            '/styles/',
            '/hooks/',
            '/views/',
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    }
  },
  eslintPrettierRecommended,
  { rules: { 'prettier/prettier': 'warn' } },
])
