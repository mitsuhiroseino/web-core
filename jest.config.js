/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-babel-esm',
  roots: ['<rootDir>/src/__test__'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'cjs', 'mjs'],
  moduleNameMapper: {
    //    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    // node_modules配下のemsをcjsに変換するために追加
    '^.+\\.m?jsx?$': ['babel-jest', { configFile: './babel.test.config.js' }],
    // 当プロジェクトのtsをjsに変換するために追加
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/src/__test__/tsconfig.json',
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(nanoid|tslib))/'],
};
