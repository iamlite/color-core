module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./src'],
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
};