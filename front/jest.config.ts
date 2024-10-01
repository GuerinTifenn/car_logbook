import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Utilisez `ts-jest` comme preset
  testEnvironment: 'jsdom', // Utilisez `jsdom` pour tester les composants React
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json', // Spécifiez `tsconfig.jest.json` ici
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Extensions reconnues par Jest
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy', // Mock des fichiers de styles
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock des fichiers d'images
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Fichier de configuration Jest pour `jest-dom`
  clearMocks: true, // Nettoie automatiquement les mocks entre les tests
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};

export default config;
