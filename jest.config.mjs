// jest.config.mjs
export default {
    transform: {
      '^.+\\.m?[jt]sx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.mjs', '**/?(*.)+(spec|test).mjs'],
  };
  