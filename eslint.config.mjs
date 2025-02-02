import globals from 'globals';
import pluginJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').FlatConfig[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			jest: tsPlugin,
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,

			'padding-line-between-statements': ['error', { blankLine: 'always', prev: 'function', next: 'function' }],
		},
	},
];
