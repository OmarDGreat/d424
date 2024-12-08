export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel to transform JavaScript and JSX
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
  },
  transformIgnorePatterns: [
    '/node_modules/(?!some-module-to-transform)', // Ensure all necessary modules are transformed
  ],
};
