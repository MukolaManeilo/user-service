/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/'],
	clearMocks: true,
	testTimeout: 10000,
	rootDir: 'dist',
	testMatch: ['**/*.test.js'],
};
