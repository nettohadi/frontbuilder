module.exports = {
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['<rootDir>/src/components/**/*.(spec|test).[jt]s?(x)'],
  testRunner: 'jest-circus/runner',
  rootDir: '.',
  roots: ['<rootDir>/src/'],
  transform: {
    '.(ts|tsx)$': require.resolve('ts-jest'),
    '.(js|jsx)$': require.resolve('babel-jest'),
  },
  verbose: true,
  // moduleNameMapper: {
  //   '@src/(.*)': '<rootDir>/src/$1',
  //   '@components/(.*)': '<rootDir>/src/components/$1',
  // },
};
