module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/protocols/**',
    '!<rootDir>/src/**/dtos/**',
    '!<rootDir>/src/**/entities/**',
    '!<rootDir>/src/**/types/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
