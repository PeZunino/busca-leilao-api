import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		exclude: [
			'**/*.e2e.spec.ts',
			'node_modules', 
			'dist' 
		],
		globals: true,
		root: './',
	},
	plugins: [
		// This is required to build the test files with SWC
		swc.vite({
			// Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
			module: { type: 'es6' },
		}),
		tsConfigPaths()
	],
});