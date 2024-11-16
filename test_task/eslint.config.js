import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        files: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.scss'],
        ignores: ['vite.config.ts', 'eslint.config.js']
    },
    ...fixupConfigRules(
        compat.extends(
            'prettier',
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript'
        )
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            react: fixupPluginRules(react),
            prettier,
            'react-hooks': fixupPluginRules(reactHooks),
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports
        },

        languageOptions: {
            globals: {
                ...globals.browser
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: './'
            }
        },

        settings: {
            react: {
                version: 'detect'
            },

            'import/resolver': {
                typescript: {}
            }
        },

        rules: {
            semi: [1, 'always'],

            quotes: [
                1,
                'single',
                {
                    avoidEscape: true
                }
            ],

            'no-console': 1,
            '@typescript-eslint/no-empty-interface': 0,
            'prettier/prettier': ['error'],

            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true
                }
            ],

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_'
                }
            ],

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/react-in-jsx-scope': 0,
            'react/display-name': 0,
            'react/prop-types': 0,
            '@typescript-eslint/no-unsafe-assignment': 'off',
            'import/prefer-default-export': 'off',
            'import/no-named-as-default': 'off',
            '@typescript-eslint/no-explicit-any': 'off',

            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^react'],
                        ['^antd'],
                        ['^\\u0000'],
                        [
                            '^@(components|constants|models|hooks|helpers|router|store|modules|context|icons|services|widgets|entities).*$'
                        ],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['\\.svg\\?react$'],
                        ['^classnames', '^.+\\.(css|scss)$']
                    ]
                }
            ],

            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error'
        }
    }
];
