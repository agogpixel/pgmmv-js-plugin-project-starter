module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-after-env.js'],
  moduleNameMapper: {
    '\\.(md)$': '<rootDir>/test/mocks/file-mock.js'
  },
  verbose: true,
  collectCoverageFrom: ['src/**/*.js', '!src/pgmmv-entry.js', '!src/**/index.js'],
  coverageReporters: ['text', 'text-summary', 'html']
};
