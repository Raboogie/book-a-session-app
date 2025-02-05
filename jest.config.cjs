const { presets } = require('./babel.config.cjs');

module.exports = {
	preset: 'ts-jest',
	collectCoverage: true,
	collectCoverageFrom: ['src/components/**/*.{ts,tsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	//testEnvironment: 'jest-fixed-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	//setupFiles: ['<rootDir>/jest.setup.js'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
