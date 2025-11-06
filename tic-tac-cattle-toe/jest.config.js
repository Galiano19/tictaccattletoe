module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/types/**",
  ],
};
